import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { sql, eq } from 'drizzle-orm';
import { z } from "zod";

// Define schema inline to avoid import issues
const waitlistEntries = pgTable("waitlist_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  name: text("name"),
  goal: text("goal"), 
  consent: text("consent").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

const insertWaitlistSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  goal: z.string().optional(),
  consent: z.string()
});

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL must be set. Did you forget to provision a database?');
}

const client = postgres(connectionString, { prepare: false, ssl: 'require' });
const db = drizzle(client, { schema: { waitlistEntries } });

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'POST') {
      // Create waitlist entry
      const validatedData = insertWaitlistSchema.parse(req.body);
      
      // Check if email already exists
      const existingEntry = await db.select().from(waitlistEntries).where(eq(waitlistEntries.email, validatedData.email));
      if (existingEntry.length > 0) {
        return res.status(409).json({ 
          message: "Email already registered on waitlist",
          success: false 
        });
      }

      const [entry] = await db
        .insert(waitlistEntries)
        .values(validatedData)
        .returning();
      
      res.status(201).json({ 
        message: "Successfully joined waitlist",
        success: true,
        entry: {
          id: entry.id,
          email: entry.email,
          name: entry.name,
          goal: entry.goal
        }
      });
    } else if (req.method === 'GET') {
      // Get waitlist entries
      const entries = await db.select().from(waitlistEntries).orderBy(waitlistEntries.createdAt);
      res.json({ 
        entries: entries.map(entry => ({
          id: entry.id,
          email: entry.email,
          name: entry.name,
          goal: entry.goal,
          createdAt: entry.createdAt
        })),
        count: entries.length
      });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    if (error.name === 'ZodError') {
      return res.status(400).json({ 
        message: "Invalid form data",
        errors: error.errors,
        success: false 
      });
    }
    
    res.status(500).json({ 
      message: "Internal server error",
      success: false 
    });
  }
}

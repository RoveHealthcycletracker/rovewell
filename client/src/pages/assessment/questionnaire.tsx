import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Question, { QuestionOption } from "@/components/assessment/Question";
import ProgressBar from "@/components/assessment/ProgressBar";
import AnimatedBackground from "@/components/animated-background";

interface AssessmentData {
  [key: string]: string;
}

const questions = [
  // Section 1: Your Lifestyle & Wellbeing ✨
  {
    id: "s1_q1",
    question: "First things first, how many fabulous years have you been lighting up the world? ✨",
    subtitle: "Age can influence how certain conditions present and develop.",
    options: [
      { value: "a", label: "I'm in my super fun teens!", points: 0 },
      { value: "b", label: "Twenties and thriving (20-29)", points: 0 },
      { value: "c", label: "Thirty, flirty, and wise (30-39)", points: 0 },
      { value: "d", label: "Forty and fantastic, or beyond! (40+)", points: 5 }
    ]
  },
  {
    id: "s1_q2",
    question: "Thinking about your beautiful body, which of these feels right? (This is for your Body Mass Index, or BMI!)",
    subtitle: "Body composition can influence hormonal balance and cycle health.",
    options: [
      { value: "a", label: "I'm on the lighter, more petite side (BMI < 18.5)", points: 0 },
      { value: "b", label: "Feeling just right in my own skin (BMI 18.5 - 24.9)", points: 0 },
      { value: "c", label: "I've got a little extra to love (BMI 25.0 - 29.9)", points: 3 },
      { value: "d", label: "I'm rocking my curves with confidence (BMI 30.0+)", points: 3 }
    ]
  },
  {
    id: "s1_q3",
    question: "Life can be a rollercoaster! How have your stress levels been feeling lately?",
    subtitle: "Stress can significantly impact hormonal balance and cycle regularity.",
    options: [
      { value: "a", label: "Super chill, like a cat in the sun ☀️", points: 0 },
      { value: "b", label: "A few little bumps here and there, but totally manageable!", points: 0 },
      { value: "c", label: "Pretty busy and buzzing, it definitely affects my mood.", points: 0 },
      { value: "d", label: "Honestly, it's been a bit overwhelming.", points: 4 }
    ]
  },
  {
    id: "s1_q4",
    question: "Let's talk about moving that gorgeous body! How often do you get your groove on with some exercise?",
    subtitle: "Physical activity supports hormonal balance and overall wellness.",
    options: [
      { value: "a", label: "I'm more of a professional relaxer! (Rarely or never)", points: 0 },
      { value: "b", label: "A couple of times a week, when I feel like it! (1-2 days)", points: 0 },
      { value: "c", label: "I'm in a pretty good rhythm! (3-4 days a week)", points: 0 },
      { value: "d", label: "I'm a fitness queen! (5-7 days a week)", points: 0 }
    ]
  },
  {
    id: "s1_q5",
    question: "What's usually on the menu in your kitchen? 🥗",
    subtitle: "Nutrition plays a key role in hormonal health and cycle regulation.",
    options: [
      { value: "a", label: "Lots of yummy, whole foods and balanced meals.", points: 0 },
      { value: "b", label: "I'm a big fan of quick, easy, and processed snacks!", points: 0 },
      { value: "c", label: "Plant power all the way! (Vegetarian or Vegan)", points: 0 },
      { value: "d", label: "I'm on a special food journey, like Low-Carb or Keto.", points: 0 }
    ]
  },
  {
    id: "insulin_symptoms",
    question: "How do you usually feel after a meal full of yummy carbs like pasta or bread?",
    subtitle: "This can indicate how your body processes insulin and glucose.",
    options: [
      { value: "a", label: "Full, happy, and ready to go!", points: 0 },
      { value: "b", label: "A little sugar rush, then a tiny nap sounds good.", points: 0 },
      { value: "c", label: "Super sleepy and kinda foggy.", points: 3 },
      { value: "d", label: "A bit shaky, cranky, or craving even more sweets!", points: 3 }
    ]
  },
  {
    id: "sleep_issues",
    question: "How would you describe your precious beauty sleep? 😴",
    subtitle: "Sleep quality affects hormone production and cycle regulation.",
    options: [
      { value: "a", label: "I sleep like a baby and wake up refreshed!", points: 0 },
      { value: "b", label: "Mostly good, with a few restless nights here and there.", points: 0 },
      { value: "c", label: "It's a bit of a struggle to fall or stay asleep.", points: 4 },
      { value: "d", label: "My partner says I snore, or I'm always tired during the day.", points: 7 }
    ]
  },
  {
    id: "mood_changes",
    question: "When it comes to your mood, does it seem to dance along with your monthly cycle?",
    subtitle: "Hormonal fluctuations can significantly impact emotional wellbeing.",
    options: [
      { value: "a", label: "Nope, my mood is pretty steady all month long!", points: 0 },
      { value: "b", label: "I get a little bit of classic PMS grumpiness.", points: 0 },
      { value: "c", label: "I notice I feel more anxious or down at certain times.", points: 0 },
      { value: "d", label: "It feels like a big emotional rollercoaster that really affects my life.", points: 0 }
    ]
  },
  {
    id: "s1_q9",
    question: "And what about your energy levels? Are they a steady flame or a flickering candle?",
    subtitle: "Energy patterns can reflect hormonal balance and overall health.",
    options: [
      { value: "a", label: "My energy is pretty consistent, yay!", points: 0 },
      { value: "b", label: "I get a bit tired right before my period.", points: 0 },
      { value: "c", label: "The fatigue before and during my period is real and slows me down.", points: 0 },
      { value: "d", label: "I feel like I'm running on empty most of the time.", points: 7 }
    ]
  },
  {
    id: "s1_q10",
    question: "Have your vitamin levels ever been checked, just out of curiosity? (Like Vitamin D, B12, or Iron!)",
    subtitle: "Nutrient deficiencies can impact cycle health and hormonal balance.",
    options: [
      { value: "a", label: "Nope, I haven't had those checked.", points: 0 },
      { value: "b", label: "Yep, and everything looked perfect!", points: 0 },
      { value: "c", label: "Yes, and my doc said one or two were a little low.", points: 0 },
      { value: "d", label: "Yes, and I was told I had a deficiency.", points: 0 }
    ]
  },

  // Section 2: Your Period Story 💖
  {
    id: "s2_q11",
    question: "Thinking way back, about how old were you when you first got your period?",
    subtitle: "Age of first period can indicate hormonal patterns and potential risk factors.",
    options: [
      { value: "a", label: "I was an early bloomer! (Before 10)", points: 0 },
      { value: "b", label: "Right on time! (10-12 years old)", points: 0 },
      { value: "c", label: "A little later to the party! (13-15 years old)", points: 0 },
      { value: "d", label: "I was fashionably late! (16 or older)", points: 0 }
    ]
  },
  {
    id: "s2_q12",
    question: "From the first day of one period to the first day of the next, how long is your cycle usually?",
    subtitle: "Cycle length is a key indicator of hormonal health and ovulation patterns.",
    options: [
      { value: "a", label: "It's a short and sweet visit! (Less than 21 days)", points: 0 },
      { value: "b", label: "Pretty standard! (21-35 days)", points: 0 },
      { value: "c", label: "A bit of a long-distance relationship! (36-90 days)", points: 3 },
      { value: "d", label: "My period is playing hide-and-seek! (Longer than 90 days)", points: 5 }
    ]
  },
  {
    id: "menstrual_cycle",
    question: "Is your cycle a creature of habit, or does it like to surprise you?",
    subtitle: "Cycle regularity is one of the Rotterdam criteria for PCOS assessment.",
    options: [
      { value: "a", label: "Super predictable, you could set a watch to it!", points: 0 },
      { value: "b", label: "Mostly regular, gives or takes a few days.", points: 0 },
      { value: "c", label: "A bit of a free spirit, it varies by a week or more.", points: 0 },
      { value: "d", label: "Totally unpredictable, it's always a surprise party!", points: 10 }
    ]
  },
  {
    id: "s2_q14",
    question: "When your period does arrive, how long does the party last?",
    subtitle: "Period duration can indicate hormonal balance and uterine health.",
    options: [
      { value: "a", label: "Just a quick pop-in! (1-2 days)", points: 0 },
      { value: "b", label: "A nice little stay. (3-5 days)", points: 0 },
      { value: "c", label: "It likes to hang out for a while. (6-7 days)", points: 0 },
      { value: "d", label: "It really overstays its welcome! (8+ days)", points: 10 }
    ]
  },
  {
    id: "s2_q15",
    question: "Let's talk flow! How would you describe your period's personality?",
    subtitle: "Flow intensity can indicate hormonal patterns and potential conditions.",
    options: [
      { value: "a", label: "Light and breezy, barely there.", points: 0 },
      { value: "b", label: "A nice, medium, go-with-the-flow type.", points: 0 },
      { value: "c", label: "A bit of a heavy-hitter, I have to change things often.", points: 3 },
      { value: "d", label: "A full-on waterfall, sometimes with little jelly-like clots.", points: 3 }
    ]
  },
  {
    id: "s2_q16",
    question: "On your heaviest day, how many pads or tampons are you and your period going through?",
    subtitle: "This helps assess flow intensity and potential heavy bleeding concerns.",
    options: [
      { value: "a", label: "Just one or two, keeping it simple.", points: 0 },
      { value: "b", label: "A pretty average amount, around 3-5.", points: 0 },
      { value: "c", label: "Quite a few, maybe 6-9.", points: 0 },
      { value: "d", label: "More than 10, or I need backup protection just in case!", points: 0 }
    ]
  },
  {
    id: "s2_q17",
    question: "Does your period ever make a surprise appearance with spotting between cycles?",
    subtitle: "Intermenstrual bleeding can indicate hormonal imbalances or other conditions.",
    options: [
      { value: "a", label: "Nope, never!", points: 0 },
      { value: "b", label: "Once in a blue moon.", points: 0 },
      { value: "c", label: "Every now and then, it likes to say hi.", points: 0 },
      { value: "d", label: "Yep, it happens in most of my cycles.", points: 0 }
    ]
  },
  {
    id: "s2_q18",
    question: "Has your period ever taken a long vacation for 3 months or more (when not pregnant)?",
    subtitle: "Amenorrhea can indicate hormonal imbalances or conditions like PCOS.",
    options: [
      { value: "a", label: "Never, it's very reliable!", points: 0 },
      { value: "b", label: "It happened once.", points: 0 },
      { value: "c", label: "It's happened a few times.", points: 0 },
      { value: "d", label: "Yes, it does this often or is on vacation right now!", points: 0 }
    ]
  },
  {
    id: "s2_q19",
    question: "Do you ever feel a little twinge or pain around the middle of your cycle when you ovulate?",
    subtitle: "Ovulation pain (mittelschmerz) can indicate normal ovulation patterns.",
    options: [
      { value: "a", label: "Nope, I don't notice a thing!", points: 0 },
      { value: "b", label: "A tiny, quick 'hello!' that lasts a few hours.", points: 0 },
      { value: "c", label: "A noticeable cramp that hangs around for a day.", points: 0 },
      { value: "d", label: "Ouch! It's a pretty painful event that stops me in my tracks.", points: 0 }
    ]
  },
  {
    id: "s2_q20",
    question: "For my wise friends who've gone through menopause, have you had any surprise bleeding?",
    subtitle: "Postmenopausal bleeding requires immediate medical evaluation.",
    options: [
      { value: "a", label: "Doesn't apply to me yet!", points: 0 },
      { value: "b", label: "Nope, not a single drop since my last period!", points: 0 },
      { value: "c", label: "Yes, some very light spotting once or twice.", points: 0 },
      { value: "d", label: "Yes, I've had noticeable or repeated bleeding.", points: 10 }
    ]
  },

  // Section 3: Let's Talk Symptoms (Body & Skin) 🤔
  {
    id: "s3_q21",
    question: "When your period cramps show up, what's the vibe? 😥",
    subtitle: "Pain severity can indicate normal menstruation vs. underlying conditions.",
    options: [
      { value: "a", label: "Just a gentle, dull ache, no big deal.", points: 0 },
      { value: "b", label: "Annoying enough for a painkiller and a heat pack.", points: 0 },
      { value: "c", label: "Pretty intense, it makes it hard to do my daily things.", points: 3 },
      { value: "d", label: "It feels like a tiny ninja battle in my uterus, and I'm not winning.", points: 5 }
    ]
  },
  {
    id: "s3_q22",
    question: "Does that pain ever travel or radiate to other places?",
    subtitle: "Pain radiation patterns can help identify the source and severity.",
    options: [
      { value: "a", label: "Nope, it stays put in my pelvic area.", points: 0 },
      { value: "b", label: "Yep, my lower back always joins the party.", points: 0 },
      { value: "c", label: "Sometimes it shoots down my legs.", points: 0 },
      { value: "d", label: "It can travel up to my tummy or even my shoulder.", points: 0 }
    ]
  },
  {
    id: "s3_q23",
    question: "What about during intimate moments? Does pain ever make an unwelcome appearance?",
    subtitle: "Dyspareunia can indicate various gynecological conditions.",
    options: [
      { value: "a", label: "Never, everything feels great.", points: 0 },
      { value: "b", label: "Rarely, just once in a while.", points: 0 },
      { value: "c", label: "Sometimes, depending on the day or position.", points: 3 },
      { value: "d", label: "Frequently or always, it's a real concern.", points: 5 }
    ]
  },
  {
    id: "s3_q24",
    question: "And what about when you go to the loo? Do you get cramps then, especially on your period?",
    subtitle: "Bowel symptoms with menstruation can indicate endometriosis.",
    options: [
      { value: "a", label: "Nope, all clear on that front!", points: 0 },
      { value: "b", label: "Once in a while, I'll notice a little something.", points: 0 },
      { value: "c", label: "It's a pretty common thing for me.", points: 3 },
      { value: "d", label: "Yes, it's often quite painful.", points: 5 }
    ]
  },
  {
    id: "hirsutism",
    question: "Have you noticed any new, fuzzy 'friends' popping up (like darker hair on your face, chest, or back)?",
    subtitle: "Excess hair growth (hirsutism) is a key sign of hyperandrogenism in PCOS.",
    options: [
      { value: "a", label: "Nope, nothing new to report!", points: 0 },
      { value: "b", label: "Just a few fine, light hairs.", points: 0 },
      { value: "c", label: "A moderate amount, it's definitely noticeable.", points: 0 },
      { value: "d", label: "Yes, a significant amount of coarse, dark hair.", points: 5 }
    ]
  },
  {
    id: "acne",
    question: "How's your skin doing? Is it behaving itself?",
    subtitle: "Adult acne, especially along the jawline, can indicate hormonal imbalances.",
    options: [
      { value: "a", label: "Mostly clear and happy!", points: 0 },
      { value: "b", label: "I get the occasional little pimple.", points: 0 },
      { value: "c", label: "I have breakouts that are pretty stubborn.", points: 0 },
      { value: "d", label: "My skin is really struggling with deep, cystic acne, especially my jawline.", points: 5 }
    ]
  },
  {
    id: "s3_q27",
    question: "And the hair on your head? Is it staying full and luscious?",
    subtitle: "Hair loss can indicate hormonal imbalances or other health conditions.",
    options: [
      { value: "a", label: "Yep, my hair is as happy as ever!", points: 0 },
      { value: "b", label: "I've noticed a little bit of extra shedding.", points: 0 },
      { value: "c", label: "It feels like it's moderately thinning out.", points: 0 },
      { value: "d", label: "I'm seeing significant hair loss, which is worrying me.", points: 0 }
    ]
  },
  {
    id: "s3_q28",
    question: "Let's talk about the 'bloat.' How often is the belly bloat a real thing for you?",
    subtitle: "Bloating patterns can indicate digestive health and hormonal influences.",
    options: [
      { value: "a", label: "Rarely, only if I eat something funky.", points: 0 },
      { value: "b", label: "Mostly just right before my period.", points: 0 },
      { value: "c", label: "Pretty often, at least a couple of times a week.", points: 0 },
      { value: "d", label: "It feels like I'm almost always bloated and uncomfortable.", points: 5 }
    ]
  },
  {
    id: "weight_gain",
    question: "Has your weight been on its own journey lately?",
    subtitle: "Unexplained weight changes can indicate hormonal imbalances or metabolic issues.",
    options: [
      { value: "a", label: "Nope, it's been pretty stable!", points: 0 },
      { value: "b", label: "I've gained a few unexplained kilos.", points: 0 },
      { value: "c", label: "I've gained a moderate amount without changing my habits.", points: 0 },
      { value: "d", label: "I've gained a lot, or it feels impossible to lose weight.", points: 5 }
    ]
  },
  {
    id: "s3_q30",
    question: "What about your urinary habits? Everything flowing smoothly?",
    subtitle: "Urinary symptoms can indicate various gynecological or urological conditions.",
    options: [
      { value: "a", label: "Yep, totally normal!", points: 0 },
      { value: "b", label: "I feel like I have to go more often.", points: 0 },
      { value: "c", label: "It sometimes feels like my bladder isn't quite empty.", points: 0 },
      { value: "d", label: "It can be painful to urinate, especially during my period.", points: 0 }
    ]
  },

  // Section 4: Your Health & Medical History 🩺
  {
    id: "s4_q31",
    question: "Have you and your doctor ever chatted about your ovaries after an ultrasound?",
    subtitle: "Ultrasound findings can help identify polycystic ovaries or other structural issues.",
    options: [
      { value: "a", label: "I've never had a pelvic ultrasound.", points: 0 },
      { value: "b", label: "Yep, and my doc said they looked perfectly normal!", points: 3 },
      { value: "c", label: "Yes, and I was told I have a few little cysts.", points: 0 },
      { value: "d", label: "Yes, my doc mentioned they have a 'polycystic' look (like a string of pearls!).", points: 0 }
    ]
  },
  {
    id: "s4_q32",
    question: "Has a doctor ever given you an official diagnosis for any of these?",
    subtitle: "Existing diagnoses provide important context for assessment and recommendations.",
    options: [
      { value: "a", label: "None of the below, I'm a mystery!", points: 0 },
      { value: "b", label: "Polycystic Ovary Syndrome (PCOS)", points: 0 },
      { value: "c", label: "Endometriosis", points: 3 },
      { value: "d", label: "Pelvic Inflammatory Disease (PID)", points: 0 }
    ]
  },
  {
    id: "s4_q33",
    question: "What about your Pap smear history? All good news, I hope!",
    subtitle: "Cervical health screening provides important health context.",
    options: [
      { value: "a", label: "Always normal, squeaky clean results!", points: 0 },
      { value: "b", label: "I had one funky result in the past, but it's all good now.", points: 0 },
      { value: "c", label: "I've had a few abnormal results over the years.", points: 0 },
      { value: "d", label: "I'm currently keeping an eye on an abnormal result with my doc.", points: 0 }
    ]
  },
  {
    id: "s4_q34",
    question: "Have you ever been on a hormonal birth control journey (like the pill or an IUD)?",
    subtitle: "Hormonal contraception can mask or alter symptoms of underlying conditions.",
    options: [
      { value: "a", label: "Nope, never used it or not in the last year.", points: 0 },
      { value: "b", label: "Yep, I'm on a combined pill right now.", points: 0 },
      { value: "c", label: "Yes, I have a hormonal IUD, implant, or get the shot.", points: 0 },
      { value: "d", label: "I just stopped using it within the last 6 months.", points: 7 }
    ]
  },
  {
    id: "s4_q35",
    question: "If you have used birth control, how did it affect your symptoms?",
    subtitle: "Response to hormonal contraception can provide insights into underlying conditions.",
    options: [
      { value: "a", label: "Not for me / Never used it!", points: 0 },
      { value: "b", label: "It was a lifesaver, my symptoms got so much better!", points: 0 },
      { value: "c", label: "Meh, it didn't really change anything.", points: 0 },
      { value: "d", label: "It was not a good time, the side effects were rough.", points: 0 }
    ]
  },
  {
    id: "s4_q36",
    question: "Have you ever taken a medication like Metformin for blood sugar or insulin?",
    subtitle: "Diabetes medications can indicate insulin resistance or metabolic concerns.",
    options: [
      { value: "a", label: "Nope, never!", points: 0 },
      { value: "b", label: "My doctor has mentioned it, but I haven't taken it.", points: 0 },
      { value: "c", label: "I have in the past.", points: 0 },
      { value: "d", label: "Yep, I'm taking it now!", points: 0 }
    ]
  },
  {
    id: "s4_q37",
    question: "Any tummy troubles? Has a doctor ever mentioned IBS or IBD to you?",
    subtitle: "Digestive conditions can interact with gynecological health and symptoms.",
    options: [
      { value: "a", label: "My tummy is pretty happy and calm!", points: 0 },
      { value: "b", label: "I have some troubles but no diagnosis.", points: 0 },
      { value: "c", label: "Yep, I've been diagnosed with Irritable Bowel Syndrome (IBS).", points: 0 },
      { value: "d", label: "Yes, I have an Inflammatory Bowel Disease (IBD) like Crohn's.", points: 0 }
    ]
  },
  {
    id: "s4_q38",
    question: "What's the story with your thyroid? Has it ever been checked?",
    subtitle: "Thyroid function can significantly impact menstrual cycles and hormonal balance.",
    options: [
      { value: "a", label: "All normal and happy!", points: 0 },
      { value: "b", label: "I have symptoms, but I've never been tested.", points: 0 },
      { value: "c", label: "Yes, I have an underactive thyroid (hypothyroidism).", points: 0 },
      { value: "d", label: "Yes, I have an overactive thyroid (hyperthyroidism).", points: 0 }
    ]
  },
  {
    id: "s4_q39",
    question: "Have you ever had any surgeries in the pelvic region?",
    subtitle: "Surgical history can impact current symptoms and health status.",
    options: [
      { value: "a", label: "Nope, never!", points: 0 },
      { value: "b", label: "Just a C-section.", points: 0 },
      { value: "c", label: "Yes, to check things out or remove a cyst/fibroid.", points: 0 },
      { value: "d", label: "Yes, a hysterectomy or another major surgery.", points: 0 }
    ]
  },
  {
    id: "s4_q40",
    question: "Do specific foods ever seem to make your tummy or pelvic pain feel worse?",
    subtitle: "Food sensitivities can indicate inflammatory conditions or digestive issues.",
    options: [
      { value: "a", label: "Not that I've noticed!", points: 0 },
      { value: "b", label: "I have a few suspects, but I'm not sure.", points: 0 },
      { value: "c", label: "Definitely, I know what my trigger foods are.", points: 0 },
      { value: "d", label: "Yes, and I follow a special diet to keep things calm.", points: 0 }
    ]
  },

  // Section 5: Your Family & Fertility Journey 👨‍👩‍👧‍👦
  {
    id: "family_history",
    question: "Thinking about your family tree, do any of the amazing women (mom, sister, daughter) have a history of these?",
    subtitle: "Family history can indicate genetic risk factors for various conditions.",
    options: [
      { value: "a", label: "Nope, not that I know of!", points: 0 },
      { value: "b", label: "PCOS or Endometriosis", points: 0 },
      { value: "c", label: "Breast Cancer", points: 0 },
      { value: "d", label: "Ovarian or Uterine Cancer", points: 10 }
    ]
  },
  {
    id: "s5_q42",
    question: "What about specific genetic stuff, like BRCA mutations or Lynch syndrome? Is that part of your family's story?",
    subtitle: "Genetic risk factors can significantly impact health monitoring and screening needs.",
    options: [
      { value: "a", label: "No known family history of these.", points: 0 },
      { value: "b", label: "I'm not sure about our genetic history.", points: 0 },
      { value: "c", label: "We suspect it, but it's not confirmed.", points: 3 },
      { value: "d", label: "Yes, there's a confirmed family history.", points: 10 }
    ]
  },
  {
    id: "s5_q43",
    question: "Let's talk about making babies! What has that part of your life looked like?",
    subtitle: "Fertility history can provide insights into hormonal health and cycle function.",
    options: [
      { value: "a", label: "It's not on my radar right now / Not trying!", points: 0 },
      { value: "b", label: "I've been able to conceive without difficulty.", points: 0 },
      { value: "c", label: "We've been trying for less than a year.", points: 0 },
      { value: "d", label: "We've been trying for more than a year without success yet.", points: 0 }
    ]
  },
  {
    id: "s5_q44",
    question: "Have you had any full-term pregnancies?",
    subtitle: "Pregnancy history can impact current hormonal status and health considerations.",
    options: [
      { value: "a", label: "0", points: 0 },
      { value: "b", label: "1", points: 0 },
      { value: "c", label: "2", points: 0 },
      { value: "d", label: "3 or more!", points: 4 }
    ]
  },
  {
    id: "s5_q45",
    question: "Have you ever explored fertility treatments or had a chat with a specialist?",
    subtitle: "Fertility treatment history can indicate underlying hormonal or structural issues.",
    options: [
      { value: "a", label: "Not applicable for me!", points: 0 },
      { value: "b", label: "We've talked about it with a doc but no treatment yet.", points: 0 },
      { value: "c", label: "I've tried medications like Clomid to help things along.", points: 0 },
      { value: "d", label: "We've tried assisted options like IUI or IVF.", points: 0 }
    ]
  },
  {
    id: "s5_q46",
    question: "How would you describe your bowel habits, especially around your period?",
    subtitle: "Cyclic bowel changes can indicate hormonal influences or conditions like endometriosis.",
    options: [
      { value: "a", label: "Pretty regular and happy!", points: 0 },
      { value: "b", label: "Things tend to slow down and get constipated.", points: 0 },
      { value: "c", label: "Things tend to speed up with diarrhea.", points: 0 },
      { value: "d", label: "It's a rollercoaster between constipation and diarrhea.", points: 0 }
    ]
  },
  {
    id: "s5_q47",
    question: "Does your pelvic pain have a specific 'personality'?",
    subtitle: "Pain characteristics can help differentiate between different gynecological conditions.",
    options: [
      { value: "a", label: "It's mostly a dull, heavy kind of ache.", points: 0 },
      { value: "b", label: "It feels more sharp and stabbing.", points: 0 },
      { value: "c", label: "It can feel like a burning sensation.", points: 0 },
      { value: "d", label: "It's a twisting or pulling kind of cramp.", points: 3 }
    ]
  },
  {
    id: "s5_q48",
    question: "Apart from your jawline, do you get any other cyclical skin things?",
    subtitle: "Cyclic skin changes can indicate hormonal fluctuations and patterns.",
    options: [
      { value: "a", label: "Nope, my skin is pretty chill.", points: 0 },
      { value: "b", label: "I get some dark skin patches in my neck or underarm area.", points: 0 },
      { value: "c", label: "Rashes or eczema seem to flare up with my cycle.", points: 0 },
      { value: "d", label: "I get painful boils or cysts in my underarm or groin area.", points: 0 }
    ]
  },
  {
    id: "s5_q49",
    question: "Does your pain ever feel like it's linked to your bladder?",
    subtitle: "Bladder symptoms can indicate various gynecological or urological conditions.",
    options: [
      { value: "a", label: "Nope, my bladder feels fine!", points: 0 },
      { value: "b", label: "I just feel like I have to pee more often.", points: 0 },
      { value: "c", label: "It feels like I can't quite empty my bladder completely.", points: 0 },
      { value: "d", label: "Yes, I get bladder pain or pain when I pee.", points: 0 }
    ]
  },
  {
    id: "s5_q50",
    question: "What's your relationship with food and your body?",
    subtitle: "Relationship with food and body can impact overall health and hormonal balance.",
    options: [
      { value: "a", label: "It's a healthy and happy one!", points: 0 },
      { value: "b", label: "I sometimes struggle with cravings or emotional eating.", points: 0 },
      { value: "c", label: "I have a history of dieting or disordered eating patterns.", points: 0 },
      { value: "d", label: "I currently have a diagnosed eating disorder.", points: 0 }
    ]
  }
];

export default function AssessmentQuestionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<AssessmentData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setLocation] = useLocation();

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const submitAssessment = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/assess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });

      const result = await response.json();
      
      if (response.ok) {
        // Store results in sessionStorage to pass to results page
        sessionStorage.setItem('assessmentResult', JSON.stringify(result));
        setLocation('/assessment/results');
      } else {
        console.error('Assessment submission failed:', result);
        // For now, redirect anyway with a default result
        const defaultResult = {
          assessment: "Unable to process assessment",
          explanation: "There was an error processing your assessment. Please try again later.",
          next_steps: "Consider consulting with a healthcare provider about your symptoms.",
          resources: []
        };
        sessionStorage.setItem('assessmentResult', JSON.stringify(defaultResult));
        setLocation('/assessment/results');
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
      // Provide a default result even if the API fails
      const defaultResult = {
        assessment: "Unable to process assessment",
        explanation: "There was an error connecting to our assessment service. Please try again later.",
        next_steps: "Consider consulting with a healthcare provider about your symptoms.",
        resources: []
      };
      sessionStorage.setItem('assessmentResult', JSON.stringify(defaultResult));
      setLocation('/assessment/results');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentAnswer = answers[questions[currentQuestion].id] || "";
  const isAnswered = currentAnswer !== "";
  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-plum via-ink-dark to-deep-plum text-ivory overflow-x-hidden relative">
      <AnimatedBackground />
      
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 backdrop-blur-sm bg-gradient-to-b from-deep-plum/40 to-transparent"
      >
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/">
              <motion.div 
                className="flex items-center space-x-3 group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-deep-plum via-plum to-ink-dark flex items-center justify-center shadow-lg border border-ivory/20">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="text-blush text-xl font-bold"
                  >
                    R
                  </motion.div>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blush via-rose-gold to-champagne bg-clip-text text-transparent">
                    Rove
                  </span>
                  <div className="text-xs text-blush/80 font-medium tracking-wider -mt-1">
                    HEALTH
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Back to Assessment Welcome */}
            <Link href="/assessment">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 text-champagne hover:text-ivory transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="relative z-5 min-h-[calc(100vh-120px)] flex items-center justify-center px-6 py-8">
        <div className="container mx-auto max-w-2xl">
          <ProgressBar current={currentQuestion + 1} total={questions.length} />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-6"
          >
            <p className="text-xs text-champagne/60">
              🔒 Your responses are private and will not be stored
            </p>
          </motion.div>
          
          <AnimatePresence mode="wait">
            <Question
              key={currentQuestion}
              question={questions[currentQuestion].question}
              subtitle={questions[currentQuestion].subtitle}
              options={questions[currentQuestion].options}
              value={currentAnswer}
              onChange={handleAnswer}
            />
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-between items-center mt-8"
          >
            <Button
              onClick={goToPrevQuestion}
              disabled={currentQuestion === 0}
              variant="outline"
              className="border-champagne/30 text-champagne hover:text-ivory hover:border-ivory disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {isLastQuestion ? (
              <Button
                onClick={submitAssessment}
                disabled={!isAnswered || isSubmitting}
                className="bg-gradient-to-r from-mint to-blush hover:from-blush hover:to-mint text-ivory font-semibold px-6 py-3 rounded-xl disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-ivory border-t-transparent rounded-full mr-2"
                    />
                    Analyzing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Check className="h-4 w-4 mr-2" />
                    Complete Assessment
                  </span>
                )}
              </Button>
            ) : (
              <Button
                onClick={goToNextQuestion}
                disabled={!isAnswered}
                className="bg-gradient-to-r from-mint to-blush hover:from-blush hover:to-mint text-ivory font-semibold px-6 py-3 rounded-xl disabled:opacity-50"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertWaitlistSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Confetti from "./confetti";
import { useInView } from "framer-motion";
import { useRef } from "react";
import type { z } from "zod";

type WaitlistFormData = z.infer<typeof insertWaitlistSchema>;

export default function WaitlistForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const form = useForm<WaitlistFormData>({
    resolver: zodResolver(insertWaitlistSchema),
    defaultValues: {
      email: "",
      name: "",
      goal: "",
      consent: "yes",
    },
  });

  const waitlistMutation = useMutation({
    mutationFn: async (data: WaitlistFormData) => {
      const response = await apiRequest("POST", "/api/waitlist", data);
      return response.json();
    },
    onSuccess: (data) => {
      setIsSuccess(true);
      setShowConfetti(true);
      toast({
        title: "Welcome to Rove! 🎉",
        description: "You're now on our exclusive waitlist. We'll be in touch soon!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/waitlist"] });
    },
    onError: (error: any) => {
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: WaitlistFormData) => {
    waitlistMutation.mutate(data);
  };

  return (
    <section id="waitlist" className="relative z-5 py-12 sm:py-20 px-4 sm:px-6" ref={ref}>
      <div className="container mx-auto max-w-2xl">
        <motion.div 
          className="glass-morphism-card rounded-3xl p-6 sm:p-8 md:p-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <motion.h2 
                    className="text-3xl sm:text-4xl font-bold text-ivory mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                  >
                    Be first to meet Rove.
                  </motion.h2>
                  <motion.p 
                    className="text-champagne/80 text-base sm:text-lg"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.4 }}
                  >
                    Join our exclusive waitlist and be among the first to experience cycle-synced wellness.
                  </motion.p>
                </div>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 }}
                    >
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-ivory font-medium">Email Address *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                placeholder="your@email.com"
                                className="bg-white/20 border-ivory/30 text-white placeholder-champagne/60 focus:border-mint focus:ring-mint/20 backdrop-blur-md focus:bg-white/30"
                                data-testid="input-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.8 }}
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-ivory font-medium">Name (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="text"
                                placeholder="Your name"
                                className="bg-white/20 border-ivory/30 text-white placeholder-champagne/60 focus:border-blush focus:ring-blush/20 backdrop-blur-md focus:bg-white/30"
                                data-testid="input-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 1.0 }}
                    >
                      <FormField
                        control={form.control}
                        name="goal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-ivory font-medium">Primary Goal</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                              <FormControl>
                                <SelectTrigger 
                                  className="bg-white/20 border-ivory/30 text-white focus:border-rose-gold focus:ring-rose-gold/20 backdrop-blur-md focus:bg-white/30"
                                  data-testid="select-goal"
                                >
                                  <SelectValue placeholder="Select your primary goal" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-deep-plum/95 border-ivory/20 backdrop-blur-md text-ivory z-50">
                                <SelectItem value="cycle-regularity" className="text-ivory hover:bg-plum/30 focus:bg-plum/30">Cycle Regularity</SelectItem>
                                <SelectItem value="pcos" className="text-ivory hover:bg-plum/30 focus:bg-plum/30">PCOS Management</SelectItem>
                                <SelectItem value="ttc" className="text-ivory hover:bg-plum/30 focus:bg-plum/30">TTC Soon</SelectItem>
                                <SelectItem value="general" className="text-ivory hover:bg-plum/30 focus:bg-plum/30">General Wellness</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 1.2 }}
                    >
                      <FormField
                        control={form.control}
                        name="consent"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value === "true"}
                                onCheckedChange={(checked) => field.onChange(checked ? "true" : "false")}
                                className="mt-1"
                                data-testid="checkbox-consent"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-champagne/80 text-sm">
                                I agree to receive early access updates and product information from Rove.
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1.4 }}
                    >
                      <Button
                        type="submit"
                        disabled={waitlistMutation.isPending}
                        className="w-full bg-gradient-to-r from-mint via-blush to-rose-gold hover:from-rose-gold hover:via-blush hover:to-mint px-6 sm:px-8 py-4 rounded-2xl text-ivory font-semibold text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 mobile-touch-target"
                        data-testid="button-submit-waitlist"
                      >
                        <span className="flex items-center justify-center">
                          {waitlistMutation.isPending ? (
                            <>
                              <motion.div 
                                className="w-4 h-4 border-2 border-ivory border-t-transparent rounded-full mr-2"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              />
                              Joining...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-paper-plane mr-2"></i>
                              Join the Waitlist
                            </>
                          )}
                        </span>
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-8"
                data-testid="success-message"
              >
                <motion.div 
                  className="mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-mint to-blush rounded-full flex items-center justify-center mx-auto">
                    <i className="fas fa-check text-2xl text-ivory"></i>
                  </div>
                </motion.div>
                <motion.h3 
                  className="text-2xl font-bold text-ivory mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Welcome to Rove! 🎉
                </motion.h3>
                <motion.p 
                  className="text-champagne/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  You're now on our exclusive waitlist. We'll be in touch soon with early access updates.
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      {showConfetti && (
        <Confetti onComplete={() => setShowConfetti(false)} />
      )}
    </section>
  );
}

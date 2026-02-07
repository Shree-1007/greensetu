'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient'

export default function Home() {
  const [formData, setFormData] = useState({
    full_name: '',
    company_name: '',
    email: '',
    challenge_description: '',
    interest_type: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      interest_type: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isSupabaseConfigured()) {
      setSubmitStatus('error')
      setErrorMessage(
        'Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.'
      )
      return
    }

    setIsLoading(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const { error } = await supabase!.from('consultation_requests').insert([
        {
          full_name: formData.full_name,
          company_name: formData.company_name || null,
          email: formData.email,
          challenge_description: formData.challenge_description,
          interest_type: formData.interest_type || null,
        },
      ])

      if (error) {
        setSubmitStatus('error')
        setErrorMessage(error.message || 'Failed to submit consultation request.')
      } else {
        setSubmitStatus('success')
        setFormData({
          full_name: '',
          company_name: '',
          email: '',
          challenge_description: '',
          interest_type: '',
        })
      }
    } catch (err) {
      setSubmitStatus('error')
      setErrorMessage('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const scrollToForm = () => {
    document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-background text-foreground dark overflow-x-hidden">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 z-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(152, 255, 100, 0.1)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Navigation */}
      <nav className="border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">GreenSetu</div>
            <div className="hidden md:flex gap-8">
              <a href="#approach" className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300">
                Our Approach
              </a>
              <a href="#services" className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300">
                Services
              </a>
              <a href="#how-it-works" className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300">
                Process
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 lg:pt-32 pb-20 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div>
            <div className="max-w-3xl">
              <div className="inline-block mb-6 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full">
                <span className="text-sm font-semibold text-primary">Sustainability × AI</span>
              </div>
              <h1 className="text-balance text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                Where Sustainability Meets Intelligent Systems
              </h1>
              <p className="text-balance text-lg text-muted-foreground mb-12 leading-relaxed max-w-xl">
                We help organizations reduce environmental impact and operational cost using AI-driven automation and data-backed sustainability solutions.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-8"
                  onClick={scrollToForm}
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border border-primary/50 text-primary hover:bg-primary/10 bg-transparent font-semibold rounded-full px-8"
                  onClick={() =>
                    document.getElementById('approach')?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  Explore More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Value Proposition */}
      <section id="services" className="relative z-10 border-t border-border py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-balance mb-6">
              Dual Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Comprehensive solutions spanning sustainability and AI to drive real impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1: Sustainability */}
            <div className="group relative rounded-2xl border border-primary/20 bg-gradient-to-br from-card/50 to-background/50 backdrop-blur-sm p-8 hover:border-primary/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="mb-6 w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center text-2xl group-hover:bg-primary/30 transition-colors">
                  🌍
                </div>
                <h3 className="text-2xl font-bold mb-2">Sustainability</h3>
                <p className="text-primary font-semibold mb-6">Carbon Emissions Reduction</p>
                <ul className="space-y-4">
                  <li className="flex gap-3 text-foreground/80">
                    <span className="text-primary font-bold flex-shrink-0">→</span>
                    <span>Carbon emissions reduction strategies</span>
                  </li>
                  <li className="flex gap-3 text-foreground/80">
                    <span className="text-primary font-bold flex-shrink-0">→</span>
                    <span>Supplier emissions tracking & optimization</span>
                  </li>
                  <li className="flex gap-3 text-foreground/80">
                    <span className="text-primary font-bold flex-shrink-0">→</span>
                    <span>Supply chain decarbonization</span>
                  </li>
                  <li className="flex gap-3 text-foreground/80">
                    <span className="text-primary font-bold flex-shrink-0">→</span>
                    <span>Emissions data collection & dashboards</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 2: AI & Automation */}
            <div className="group relative rounded-2xl border border-primary/20 bg-gradient-to-br from-card/50 to-background/50 backdrop-blur-sm p-8 hover:border-primary/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="mb-6 w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center text-2xl group-hover:bg-primary/30 transition-colors">
                  ⚡
                </div>
                <h3 className="text-2xl font-bold mb-2">AI & Automation</h3>
                <p className="text-primary font-semibold mb-6">Intelligent Systems</p>
                <ul className="space-y-4">
                  <li className="flex gap-3 text-foreground/80">
                    <span className="text-primary font-bold flex-shrink-0">→</span>
                    <span>AI-powered document processing</span>
                  </li>
                  <li className="flex gap-3 text-foreground/80">
                    <span className="text-primary font-bold flex-shrink-0">→</span>
                    <span>Internal knowledge & decision systems</span>
                  </li>
                  <li className="flex gap-3 text-foreground/80">
                    <span className="text-primary font-bold flex-shrink-0">→</span>
                    <span>LLM-based analytics and assistants</span>
                  </li>
                  <li className="flex gap-3 text-foreground/80">
                    <span className="text-primary font-bold flex-shrink-0">→</span>
                    <span>Cost-optimized, production-grade AI systems</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why GreenSetu */}
      <section id="approach" className="relative z-10 border-t border-border py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-balance mb-20">Why GreenSetu?</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: '⚙️',
                title: 'Hybrid Expertise',
                desc: 'We combine deep sustainability domain knowledge with production-grade AI engineering. Most consultants specialize in one or the other. We do both, and do it well.',
              },
              {
                icon: '🏗️',
                title: 'Real-World Systems',
                desc: 'We build production systems, not prototypes. Every solution is designed for scale, reliability, and cost optimization from day one.',
              },
              {
                icon: '📊',
                title: 'Outcome-Driven',
                desc: 'We focus on measurable impact: reduced compliance costs, faster reporting, lower emissions footprint, and optimized operational efficiency.',
              },
              {
                icon: '💡',
                title: 'No Buzzwords',
                desc: 'We speak plainly about capabilities and limitations. You get honest assessment and realistic timelines, not marketing hype.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-card/30 to-background/30 backdrop-blur-sm p-8 hover:border-primary/30 transition-all duration-300 hover:bg-card/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 border-t border-border py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-balance mb-20">Our Process</h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Discover',
                desc: 'We understand your sustainability and operational objectives.',
              },
              {
                step: '02',
                title: 'Design',
                desc: 'We design lean data & AI architectures tailored for you.',
              },
              {
                step: '03',
                title: 'Build',
                desc: 'We build and deploy production-grade systems.',
              },
              {
                step: '04',
                title: 'Optimize',
                desc: 'We optimize for compliance, cost, and sustainable scale.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="group relative rounded-xl border border-primary/20 bg-gradient-to-br from-card/50 to-background/50 backdrop-blur-sm p-8 hover:border-primary/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="text-5xl font-bold text-primary/40 group-hover:text-primary/60 transition-colors mb-4">{item.step}</div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section id="consultation-form" className="relative z-10 border-t border-border py-20 lg:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-balance mb-6">Let's Talk</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Share your sustainability and operational challenges. We'll explore how we can help reduce your carbon footprint and optimize your operations.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-gradient-to-br from-card/50 to-background/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 md:p-12">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="full_name" className="font-semibold">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="full_name"
                name="full_name"
                type="text"
                placeholder="John Doe"
                value={formData.full_name}
                onChange={handleInputChange}
                required
                className="border-border bg-background"
              />
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="company_name" className="font-semibold">
                Company Name
              </Label>
              <Input
                id="company_name"
                name="company_name"
                type="text"
                placeholder="Acme Corp"
                value={formData.company_name}
                onChange={handleInputChange}
                className="border-border bg-background"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="font-semibold">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="border-border bg-background"
              />
            </div>

            {/* Problem Description */}
            <div className="space-y-2">
              <Label htmlFor="challenge_description" className="font-semibold">
                Describe Your Challenge <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="challenge_description"
                name="challenge_description"
                placeholder="Tell us about your sustainability or operational challenges, and what you're hoping to achieve..."
                value={formData.challenge_description}
                onChange={handleInputChange}
                required
                className="border-border bg-background min-h-32 resize-none"
              />
            </div>

            {/* Engagement Type */}
            <div className="space-y-2">
              <Label htmlFor="interest_type" className="font-semibold">
                What Are You Interested In?
              </Label>
              <Select value={formData.interest_type} onValueChange={handleSelectChange}>
                <SelectTrigger className="border-border bg-background">
                  <SelectValue placeholder="Select an engagement type..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sustainability Advisory">Sustainability Advisory</SelectItem>
                  <SelectItem value="AI Automation">AI Automation</SelectItem>
                  <SelectItem value="Hybrid (Sustainability + AI)">
                    Hybrid (Sustainability + AI)
                  </SelectItem>
                  <SelectItem value="Not Sure">Not Sure</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4 text-green-800 dark:text-green-200">
                <p className="font-semibold">Success!</p>
                <p className="text-sm">
                  Your consultation request has been submitted. We'll be in touch shortly.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-800 dark:text-red-200">
                <p className="font-semibold">Something went wrong</p>
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              {isLoading ? 'Submitting...' : 'Request Consultation'}
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border bg-card/50 backdrop-blur-sm py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-3">GreenSetu</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Practical Sustainability and AI Systems for Real-World Impact
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Navigation</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><a href="#approach" className="hover:text-primary transition-colors">Our Approach</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
                <li><a href="#how-it-works" className="hover:text-primary transition-colors">Process</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
              <a href="mailto:shreejadhav4625@gmail.com" className="text-sm text-primary hover:text-primary/80 transition-colors font-medium">
                shreejadhav4625@gmail.com
              </a>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8">
            <p className="text-xs text-foreground/50 text-center">
              © 2024 GreenSetu. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

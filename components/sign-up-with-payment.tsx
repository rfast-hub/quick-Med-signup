'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Activity, ArrowLeft, CreditCard } from "lucide-react"
import Link from 'next/link'

export function SignUpWithPaymentComponent() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    plan: '',
    agreeTerms: false,
    cardNumber: '',
    cardExpiry: '',
    cardCVC: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, plan: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, agreeTerms: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      if (formData.plan === 'free') {
        console.log('Form submitted:', formData)
        // Here you would typically send the data to your backend
      } else {
        setStep(2)
      }
    } else {
      console.log('Form submitted with payment:', formData)
      // Here you would typically process the payment and send the data to your backend
    }
  }

  const isPaidPlan = formData.plan === 'premium' || formData.plan === 'ultimate'

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b bg-white">
        <Link href="/" className="flex items-center justify-center">
          <Activity className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-lg font-bold">Quick Med</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4 flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </nav>
      </header>
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{step === 1 ? "Create your account" : "Payment Information"}</CardTitle>
            <CardDescription>
              {step === 1 ? "Start your journey to better health with Quick Med" : "Complete your subscription"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {step === 1 ? (
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" placeholder="John" required
                           value={formData.firstName} onChange={handleInputChange} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" placeholder="Doe" required
                           value={formData.lastName} onChange={handleInputChange} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" placeholder="john@example.com" type="email" required
                           value={formData.email} onChange={handleInputChange} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" required
                           value={formData.password} onChange={handleInputChange} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" name="confirmPassword" type="password" required
                           value={formData.confirmPassword} onChange={handleInputChange} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="plan">Select Plan</Label>
                    <Select onValueChange={handleSelectChange} value={formData.plan}>
                      <SelectTrigger id="plan">
                        <SelectValue placeholder="Select a plan" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="free">Free Starter Plan</SelectItem>
                        <SelectItem value="premium">Premium Plan ($10/month)</SelectItem>
                        <SelectItem value="ultimate">Ultimate Health Plan ($30/month)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" checked={formData.agreeTerms} onCheckedChange={handleCheckboxChange} />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link href="#" className="text-blue-600 hover:underline">
                        terms and conditions
                      </Link>
                    </label>
                  </div>
                </div>
              ) : (
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" required
                           value={formData.cardNumber} onChange={handleInputChange} />
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex-1 flex flex-col space-y-1.5">
                      <Label htmlFor="cardExpiry">Expiry Date</Label>
                      <Input id="cardExpiry" name="cardExpiry" placeholder="MM/YY" required
                             value={formData.cardExpiry} onChange={handleInputChange} />
                    </div>
                    <div className="flex-1 flex flex-col space-y-1.5">
                      <Label htmlFor="cardCVC">CVC</Label>
                      <Input id="cardCVC" name="cardCVC" placeholder="123" required
                             value={formData.cardCVC} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button 
              className="w-full" 
              type="submit" 
              disabled={step === 1 ? !formData.agreeTerms || !formData.plan : false}
              onClick={handleSubmit}
            >
              {step === 1 ? (isPaidPlan ? "Proceed to Payment" : "Sign Up") : "Complete Payment"}
            </Button>
            {step === 1 && (
              <p className="mt-4 text-sm text-center text-gray-500">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Log in
                </Link>
              </p>
            )}
            {step === 2 && (
              <p className="mt-4 text-sm text-center text-gray-500 flex items-center justify-center">
                <CreditCard className="mr-2 h-4 w-4" />
                Secure payment powered by Stripe
              </p>
            )}
          </CardFooter>
        </Card>
      </main>
      <footer className="py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
        <p className="text-xs text-center text-gray-500">© 2023 Quick Med. All rights reserved.</p>
      </footer>
    </div>
  )
}
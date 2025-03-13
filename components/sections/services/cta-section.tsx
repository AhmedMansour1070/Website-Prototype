import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AuthModal } from "@/components/auth-modal"

export function ServicesCTASection() {
  return (
    <section className="py-16 text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
          Ready to optimize your fleet operations?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of companies that trust our platform for their fleet management needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <AuthModal triggerText="Sign Up Now" defaultTab="register" />
          <Link href="/contact">
            <Button variant="outline">Contact Sales</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}


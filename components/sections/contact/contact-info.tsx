import { Mail, Phone, MapPin, Clock } from "lucide-react"

export function ContactInfo() {
  return (
    <div className="grid gap-4">
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-blue-100 p-2">
          <Mail className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold">Email</h3>
          <p className="text-gray-500">info@fleetmanager.com</p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="rounded-full bg-blue-100 p-2">
          <Phone className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold">Phone</h3>
          <p className="text-gray-500">+1 (555) 123-4567</p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="rounded-full bg-blue-100 p-2">
          <MapPin className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold">Address</h3>
          <p className="text-gray-500">123 Fleet Street, Business District, City, 12345</p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="rounded-full bg-blue-100 p-2">
          <Clock className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold">Business Hours</h3>
          <p className="text-gray-500">Monday - Friday: 9:00 AM - 5:00 PM</p>
        </div>
      </div>
    </div>
  )
}


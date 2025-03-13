import Image from "next/image"

export function ContactMap() {
  return (
    <div className="relative h-[300px] rounded-lg overflow-hidden">
      <Image src="/images/office-map.jpg" alt="Office Location" fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20"></div>
    </div>
  )
}


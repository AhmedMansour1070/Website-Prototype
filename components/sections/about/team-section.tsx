import { User, Briefcase, Code, HeadphonesIcon } from "lucide-react"

const teamMembers = [
  {
    icon: Briefcase,
    title: "Industry Experts",
    description: "With decades of transportation and logistics experience",
    color: "text-blue-600",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    icon: Code,
    title: "Software Engineers",
    description: "Creating innovative solutions for complex problems",
    color: "text-indigo-600",
    gradient: "from-indigo-500 to-indigo-600"
  },
  {
    icon: User,
    title: "Data Scientists",
    description: "Turning fleet data into actionable insights",
    color: "text-purple-600",
    gradient: "from-purple-500 to-purple-600"
  },
  {
    icon: HeadphonesIcon,
    title: "Support Specialists",
    description: "Dedicated to your success 24/7",
    color: "text-green-600",
    gradient: "from-green-500 to-green-600"
  }
]

export function TeamSection() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-white to-blue-50 p-8 rounded-xl shadow-sm border border-blue-100">
        <div className="text-center mb-8">
          <div className="inline-block mb-2 px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            Our People
          </div>
          <h2 className="text-3xl font-semibold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
            Our Team
          </h2>
        </div>
        
        <p className="mb-8 text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
          Our team consists of industry experts, software engineers, data scientists, and customer support specialists who
          are passionate about creating the best fleet management solution on the market.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex items-center space-x-4 border border-gray-100">
              <div className={`bg-gradient-to-r ${member.gradient} p-3 rounded-full shadow-sm`}>
                <member.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className={`font-semibold bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent`}>{member.title}</h3>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
            Join Our Team
          </button>
        </div>
      </div>
    </div>
  )
}
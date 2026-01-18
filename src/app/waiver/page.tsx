'use client'

import { useState } from 'react'
import Button from '@/components/Button'
import SectionDivider from '@/components/SectionDivider'

export default function WaiverPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    emergencyContact: '',
    emergencyPhone: '',
    agreed: false,
    parentName: '',
    isMinor: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission - would connect to backend
    alert('Tech Inspection submitted! You will receive a confirmation email shortly.')
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 bg-asphalt-dark overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block telemetry-text text-sm text-apex-red uppercase tracking-widest mb-4">
            // Tech Inspection
          </span>
          <h1 className="racing-headline text-5xl md:text-6xl text-grid-white mb-6">
            Pre-Race
            <span className="text-apex-red"> Clearance</span>
          </h1>
          <p className="telemetry-text text-lg text-pit-gray max-w-2xl mx-auto">
            Complete this form before your session to ensure a smooth pit lane entry.
            All drivers must complete the tech inspection.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* Waiver Form Section */}
      <section className="py-16 bg-asphalt">
        <div className="max-w-2xl mx-auto px-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Driver Information */}
            <div className="bg-asphalt-dark p-6 border border-white/10">
              <h2 className="racing-headline text-xl text-grid-white mb-6">
                <span className="text-telemetry-cyan">01 // </span>
                Driver Information
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block telemetry-text text-xs text-pit-gray uppercase tracking-wider mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-asphalt border border-white/20 px-4 py-3 text-grid-white telemetry-text focus:border-telemetry-cyan focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block telemetry-text text-xs text-pit-gray uppercase tracking-wider mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-asphalt border border-white/20 px-4 py-3 text-grid-white telemetry-text focus:border-telemetry-cyan focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block telemetry-text text-xs text-pit-gray uppercase tracking-wider mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-asphalt border border-white/20 px-4 py-3 text-grid-white telemetry-text focus:border-telemetry-cyan focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block telemetry-text text-xs text-pit-gray uppercase tracking-wider mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-asphalt border border-white/20 px-4 py-3 text-grid-white telemetry-text focus:border-telemetry-cyan focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block telemetry-text text-xs text-pit-gray uppercase tracking-wider mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  required
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  className="w-full bg-asphalt border border-white/20 px-4 py-3 text-grid-white telemetry-text focus:border-telemetry-cyan focus:outline-none transition-colors"
                />
              </div>

              <div className="mt-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isMinor}
                    onChange={(e) => setFormData({ ...formData, isMinor: e.target.checked })}
                    className="w-5 h-5 accent-apex-red"
                  />
                  <span className="telemetry-text text-sm text-grid-white">
                    This driver is under 18 years old
                  </span>
                </label>
              </div>

              {formData.isMinor && (
                <div className="mt-4 p-4 bg-apex-red/10 border border-apex-red/30">
                  <label className="block telemetry-text text-xs text-apex-red uppercase tracking-wider mb-2">
                    Parent/Guardian Full Name *
                  </label>
                  <input
                    type="text"
                    required={formData.isMinor}
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full bg-asphalt border border-apex-red/30 px-4 py-3 text-grid-white telemetry-text focus:border-apex-red focus:outline-none transition-colors"
                  />
                </div>
              )}
            </div>

            {/* Emergency Contact */}
            <div className="bg-asphalt-dark p-6 border border-white/10">
              <h2 className="racing-headline text-xl text-grid-white mb-6">
                <span className="text-telemetry-cyan">02 // </span>
                Emergency Contact
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block telemetry-text text-xs text-pit-gray uppercase tracking-wider mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    className="w-full bg-asphalt border border-white/20 px-4 py-3 text-grid-white telemetry-text focus:border-telemetry-cyan focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block telemetry-text text-xs text-pit-gray uppercase tracking-wider mb-2">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.emergencyPhone}
                    onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                    className="w-full bg-asphalt border border-white/20 px-4 py-3 text-grid-white telemetry-text focus:border-telemetry-cyan focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Waiver Agreement */}
            <div className="bg-asphalt-dark p-6 border border-white/10">
              <h2 className="racing-headline text-xl text-grid-white mb-6">
                <span className="text-telemetry-cyan">03 // </span>
                Acknowledgment & Release
              </h2>

              <div className="h-48 overflow-y-auto bg-asphalt p-4 border border-white/10 mb-4">
                <p className="telemetry-text text-xs text-pit-gray leading-relaxed">
                  WAIVER AND RELEASE OF LIABILITY
                  <br /><br />
                  In consideration of being allowed to participate in any way in the MC Racing Sim
                  program, related events and activities, I, the undersigned, acknowledge, appreciate,
                  and agree that:
                  <br /><br />
                  1. The risk of injury from the activities involved in this program is significant,
                  including the potential for permanent paralysis and death, and while particular
                  rules, equipment, and personal discipline may reduce this risk, the risk of serious
                  injury does exist.
                  <br /><br />
                  2. I KNOWINGLY AND FREELY ASSUME ALL SUCH RISKS, both known and unknown, EVEN IF
                  ARISING FROM THE NEGLIGENCE OF THE RELEASEES or others, and assume full
                  responsibility for my participation.
                  <br /><br />
                  3. I willingly agree to comply with the stated and customary terms and conditions
                  for participation. If, however, I observe any unusual significant hazard during my
                  presence or participation, I will remove myself from participation and bring such
                  to the attention of the nearest official immediately.
                  <br /><br />
                  4. I, for myself and on behalf of my heirs, assigns, personal representatives and
                  next of kin, HEREBY RELEASE AND HOLD HARMLESS MC Racing Sim Fort Wayne, their
                  officers, officials, agents, and/or employees, other participants, sponsoring
                  agencies, sponsors, advertisers, and if applicable, owners and lessors of premises
                  used to conduct the event ("RELEASEES"), WITH RESPECT TO ANY AND ALL INJURY,
                  DISABILITY, DEATH, or loss or damage to person or property, WHETHER ARISING FROM
                  THE NEGLIGENCE OF THE RELEASEES OR OTHERWISE, to the fullest extent permitted by law.
                  <br /><br />
                  5. I acknowledge that motion simulators may cause motion sickness, dizziness, or
                  discomfort in some individuals. I agree to immediately stop using the equipment if
                  I feel unwell.
                  <br /><br />
                  6. I agree to pay for any damage to equipment caused by my negligence or misuse.
                </p>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreed}
                  onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                  className="w-5 h-5 accent-apex-red mt-0.5"
                />
                <span className="telemetry-text text-sm text-grid-white">
                  I have read this release of liability and assumption of risk agreement, fully
                  understand its terms, understand that I have given up substantial rights by
                  signing it, and sign it freely and voluntarily without any inducement. *
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button type="submit" size="lg" fullWidth>
                Complete Tech Inspection
              </Button>
              <p className="telemetry-text text-xs text-pit-gray mt-4">
                Your information is secure and will only be used for race day operations.
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

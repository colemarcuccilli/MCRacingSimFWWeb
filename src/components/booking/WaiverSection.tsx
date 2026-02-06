'use client'

interface WaiverSectionProps {
  waiverAccepted: boolean
  onWaiverChange: (accepted: boolean) => void
  marketingOptIn: boolean
  onMarketingChange: (optIn: boolean) => void
  error?: string
}

const WAIVER_TEXT = `RELEASE OF LIABILITY, WAIVER OF CLAIMS, AND INDEMNITY AGREEMENT

MC Racing Sim
1205 W Main St, Fort Wayne, IN

By signing this agreement, I acknowledge that I have voluntarily chosen to participate in racing simulation activities at MC Racing Sim.

ASSUMPTION OF RISKS
I understand that racing simulation activities involve certain inherent risks, including but not limited to:
- Motion sickness or dizziness from simulator movement
- Eye strain or headaches from screen exposure
- Minor physical discomfort from prolonged sitting
- Potential trips or falls when entering/exiting equipment

I freely and voluntarily assume all risks associated with my participation.

RELEASE AND WAIVER
In consideration for being permitted to participate, I hereby release, waive, and forever discharge MC Racing Sim, its owners, operators, employees, and agents from any and all claims, demands, or causes of action that I may have arising out of my participation in racing simulation activities.

INDEMNIFICATION
I agree to indemnify and hold harmless MC Racing Sim from any claims, damages, or expenses (including attorney's fees) arising from my participation or any breach of this agreement.

MEDICAL CONDITIONS
I confirm that I do not have any medical conditions that would prevent my safe participation, including but not limited to epilepsy, heart conditions, or severe motion sickness. I will immediately notify staff of any discomfort during my session.

RULES AND CONDUCT
I agree to follow all rules and instructions provided by MC Racing Sim staff. I understand that failure to comply may result in termination of my session without refund.

PHOTOGRAPHY/VIDEO
I consent to the use of photographs or video recordings taken during my visit for promotional purposes by MC Racing Sim.

ACKNOWLEDGMENT
I have read this agreement, understand its contents, and sign it voluntarily. I understand that this is a legally binding release of liability.

By checking the box below, I electronically sign this waiver and agree to all terms above.`

export default function WaiverSection({
  waiverAccepted,
  onWaiverChange,
  marketingOptIn,
  onMarketingChange,
  error,
}: WaiverSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="racing-headline text-xl text-grid-white">
        Liability <span className="text-apex-red">Waiver</span>
      </h3>

      <div className="bg-asphalt-dark border border-white/10 p-4 space-y-4">
        {/* Scrollable Waiver Text */}
        <div className="h-48 overflow-y-auto bg-carbon-black border border-white/10 p-4">
          <pre className="whitespace-pre-wrap telemetry-text text-xs text-pit-gray leading-relaxed font-sans">
            {WAIVER_TEXT}
          </pre>
        </div>

        {/* Waiver Checkbox */}
        <label
          className={`flex items-start gap-3 cursor-pointer p-3 border ${
            error ? 'border-apex-red bg-apex-red/5' : 'border-white/10'
          } hover:border-white/30 transition-colors`}
        >
          <input
            type="checkbox"
            checked={waiverAccepted}
            onChange={(e) => onWaiverChange(e.target.checked)}
            className="mt-1 w-5 h-5 accent-apex-red"
          />
          <span className="telemetry-text text-sm text-grid-white">
            I have read and agree to the{' '}
            <span className="text-apex-red font-bold">Liability Waiver</span> above.{' '}
            <span className="text-apex-red">*</span>
          </span>
        </label>
        {error && <p className="telemetry-text text-xs text-apex-red">{error}</p>}

        {/* Marketing Opt-in */}
        <label className="flex items-start gap-3 cursor-pointer p-3 border border-white/10 hover:border-white/30 transition-colors">
          <input
            type="checkbox"
            checked={marketingOptIn}
            onChange={(e) => onMarketingChange(e.target.checked)}
            className="mt-1 w-5 h-5 accent-telemetry-cyan"
          />
          <span className="telemetry-text text-sm text-pit-gray">
            I&apos;d like to receive updates about events, promotions, and racing news from MC Racing
            Sim.
          </span>
        </label>
      </div>
    </div>
  )
}

import { Sparkles } from 'lucide-react'
import { asset } from '../../utils/asset'

/** Real product cut-outs (from the catalogue photos) standing on a glowing podium. */
export default function HeroShowcase() {
  return (
    <div className="relative mx-auto aspect-[10/7] w-full max-w-2xl">
      {/* glow behind the products */}
      <div aria-hidden className="absolute inset-x-6 top-10 bottom-6 rounded-full bg-brand/35 blur-3xl" />

      {/* podium */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[30%]">
        <div className="absolute inset-0 rounded-[50%] bg-gradient-to-b from-brand/50 to-brand/10 shadow-[0_0_60px_10px_rgba(8,121,249,0.55)] ring-2 ring-cyan/60" />
        <div className="absolute inset-x-[7%] inset-y-[14%] rounded-[50%] bg-gradient-to-b from-navy-800 to-navy ring-1 ring-cyan/40" />
        <div className="absolute inset-x-[16%] inset-y-[30%] rounded-[50%] bg-brand/25 shadow-[0_0_30px_6px_rgba(32,196,244,0.45)]" />
      </div>

      <img
        src={asset("/images/hero/monitor.webp")}
        alt="ASUS TUF Gaming 24-inch monitor"
        className="hero-float-delay absolute bottom-[21%] right-0 w-[50%] drop-shadow-[0_16px_24px_rgba(0,0,0,0.55)]"
        loading="eager"
      />
      <img
        src={asset("/images/hero/headset.webp")}
        alt="ASUS TUF Gaming H1 headset"
        className="hero-float absolute bottom-[5%] left-[0%] z-20 w-[28%] drop-shadow-[0_16px_24px_rgba(0,0,0,0.55)]"
        loading="eager"
      />
      <img
        src={asset("/images/hero/laptop.webp")}
        alt="ASUS TUF Gaming F16 laptop"
        className="hero-float absolute bottom-[19%] left-0 z-10 w-[57%] drop-shadow-[0_16px_24px_rgba(0,0,0,0.55)]"
        loading="eager"
      />
      <img
        src={asset("/images/hero/printer.webp")}
        alt="Canon PIXMA ink tank printer"
        className="hero-float-delay absolute bottom-[2%] left-[24%] z-20 w-[37%] drop-shadow-[0_16px_24px_rgba(0,0,0,0.55)]"
        loading="eager"
      />
      <img
        src={asset("/images/hero/motherboard.webp")}
        alt="ASUS TUF Gaming B860M motherboard"
        className="hero-float absolute bottom-[6%] right-[10%] z-20 w-[25%] drop-shadow-[0_16px_24px_rgba(0,0,0,0.55)]"
        loading="eager"
      />
      <img
        src={asset("/images/hero/mouse.webp")}
        alt="ASUS ROG Impact III gaming mouse"
        className="hero-float-delay absolute bottom-[4%] right-0 z-30 w-[12%] drop-shadow-[0_16px_24px_rgba(0,0,0,0.55)]"
        loading="eager"
      />

      <div className="absolute right-0 top-0 z-30 flex rotate-6 items-center gap-1.5 rounded-xl bg-gradient-to-r from-brand to-cyan px-3 py-1.5 text-xs font-bold text-white shadow-lg sm:text-sm">
        <Sparkles className="h-4 w-4" aria-hidden /> Popular Picks
      </div>
    </div>
  )
}

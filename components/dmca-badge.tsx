export default function DmcaBadge(){
  return <a
    href="https://www.dmca.com/Protection/Status.aspx?ID=efc009b7-5a66-4722-ae89-90125f5330eb&refurl=https://pao-os.com/"
    title="DMCA.com Protection Status" className="dmca-badge pao-dmca-badge"
    target="_blank" rel="noopener noreferrer"
  >
    {/* Official externally hosted badge, kept at its original proportions. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="https://images.dmca.com/Badges/dmca-badge-w250-5x1-07.png?ID=efc009b7-5a66-4722-ae89-90125f5330eb"
      alt="DMCA.com Protection Status" width={125} height={25} loading="lazy" decoding="async"/>
  </a>;
}

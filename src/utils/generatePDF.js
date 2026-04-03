import jsPDF       from 'jspdf'
import html2canvas from 'html2canvas'

const OWNER_NAME  = import.meta.env.VITE_OWNER_NAME   || 'Ad Soyad'
const OWNER_TITLE = import.meta.env.VITE_OWNER_TITLE  || 'Unvan'
const COMPANY     = import.meta.env.VITE_COMPANY_NAME || 'Şirket'
const WEBSITE     = import.meta.env.VITE_WEBSITE      || 'www.sirketiniz.com'

const fmt = n =>
  '\u20BA' + n.toLocaleString('tr-TR', { maximumFractionDigits: 0 })

const qNo = () =>
  `ZNT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 8000) + 1000)}`

const fmtDate = (offsetDays = 0) =>
  new Date(Date.now() + offsetDays * 86_400_000).toLocaleDateString('tr-TR', {
    day: '2-digit', month: 'long', year: 'numeric',
  })

function buildHTML(info, pricing) {
  const QN      = qNo()
  const today   = fmtDate(0)
  const validTo = fmtDate(15)
  const svcs    = pricing.selectedServices

  const rows = svcs.map((s, i) => `
    <tr style="background:${i % 2 === 0 ? '#ffffff' : '#f8f9ff'};">
      <td style="padding:9px 14px;border-bottom:1px solid #eaedff;vertical-align:top;">
        <div style="font-weight:700;font-size:11.5px;color:#0f172a;line-height:1.3;">${s.name}</div>
        <div style="font-size:9px;color:#94a3b8;margin-top:1px;">${s.subtitle}</div>
      </td>
      <td style="padding:9px 14px;text-align:center;border-bottom:1px solid #eaedff;
                 font-size:9.5px;vertical-align:middle;white-space:nowrap;
                 color:${s.unit === 'ay' ? '#7c3aed' : '#64748b'};
                 font-weight:${s.unit === 'ay' ? '600' : '400'};">
        ${s.unit === 'ay' ? 'Aylık' : 'Tek Seferlik'}
      </td>
      <td style="padding:9px 14px;text-align:right;border-bottom:1px solid #eaedff;
                 font-size:12px;font-weight:800;color:#0f172a;vertical-align:middle;
                 white-space:nowrap;">
        ${fmt(s.price)}
      </td>
    </tr>`).join('')

  const discountRows = [
    pricing.bundleDiscount && `
      <tr>
        <td colspan="2" style="padding:6px 14px 6px;text-align:right;vertical-align:middle;">
          <span style="font-size:10px;color:#7c3aed;font-weight:600;">
            ${pricing.bundleDiscount.bundle.name}
          </span>
          <span style="background:#ede9fe;color:#6d28d9;font-size:8.5px;font-weight:700;
                       padding:2px 7px;border-radius:99px;margin-left:6px;">
            -%${Math.round(pricing.bundleDiscount.rate * 100)}
          </span>
        </td>
        <td style="padding:6px 14px;text-align:right;font-size:11.5px;font-weight:700;
                   color:#16a34a;white-space:nowrap;">
          -${fmt(Math.round(pricing.bundleDiscount.amount))}
        </td>
      </tr>`,

    pricing.corporateDiscount && `
      <tr>
        <td colspan="2" style="padding:6px 14px;text-align:right;vertical-align:middle;">
          <span style="font-size:10px;color:#7c3aed;font-weight:600;">
            Kurumsal Paket İndirimi
          </span>
          <span style="background:#ede9fe;color:#6d28d9;font-size:8.5px;font-weight:700;
                       padding:2px 7px;border-radius:99px;margin-left:6px;">
            -%${Math.round(pricing.corporateDiscount.rate * 100)}
          </span>
        </td>
        <td style="padding:6px 14px;text-align:right;font-size:11.5px;font-weight:700;
                   color:#16a34a;white-space:nowrap;">
          -${fmt(Math.round(pricing.corporateDiscount.amount))}
        </td>
      </tr>`,
  ].filter(Boolean).join('')

  const payRows = [[.40,'Sözleşme imzasında'],[.30,'Proje yarısında'],[.30,'Proje tesliminde']]
    .map(([pct, label]) => `
      <tr>
        <td style="padding:5px 0;font-size:10px;color:#1e293b;font-weight:500;">${label}</td>
        <td style="padding:5px 0;text-align:right;font-size:11px;font-weight:800;
                   color:#0f172a;white-space:nowrap;">
          ${fmt(Math.round(pricing.total * pct))}
        </td>
      </tr>`).join('')

  const termItems = [
    'Teklif 15 gün geçerlidir',
    'Fiyatlara KDV dahildir (%20)',
    '3 ücretsiz revizyon hakkı',
    'Kaynak dosyalar teslim edilir',
    'NDA talep edilebilir',
  ].map(t => `
    <tr>
      <td style="padding:4px 0;vertical-align:top;width:14px;">
        <span style="color:#7c3aed;font-weight:700;font-size:10px;">✓</span>
      </td>
      <td style="padding:4px 0;font-size:10px;color:#475569;line-height:1.35;">${t}</td>
    </tr>`).join('')

  return /* html */`
<div style="
  width:794px;
  font-family:'Inter','Segoe UI',Helvetica,Arial,sans-serif;
  -webkit-font-smoothing:antialiased;
  color:#1e293b;
  background:#ffffff;
">

  <div style="
    background:#070c1b;
    padding:24px 40px 20px;
    position:relative;
  ">
    <div style="
      position:absolute;top:0;left:0;right:0;height:4px;
      background:linear-gradient(90deg,#7c3aed,#8b5cf6,#4f46e5);
    "></div>

    <table style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="vertical-align:middle;padding:0;">
          <table style="border-collapse:collapse;">
            <tr>
              <td style="
                width:38px;height:38px;border-radius:9px;
                background:linear-gradient(135deg,#7c3aed,#4f46e5);
                text-align:center;vertical-align:middle;
                font-size:19px;padding:0;
              ">&#9889;</td>
              <td style="padding-left:11px;vertical-align:middle;">
                <div style="font-size:22px;font-weight:900;color:#ffffff;
                            letter-spacing:-0.5px;line-height:1;">${COMPANY}</div>
                <div style="font-size:9.5px;color:#a78bfa;margin-top:3px;letter-spacing:0.1px;">
                  ${OWNER_NAME}&nbsp;&nbsp;·&nbsp;&nbsp;${OWNER_TITLE}
                </div>
              </td>
            </tr>
          </table>
        </td>
        <td style="text-align:right;vertical-align:middle;padding:0;">
          <div style="font-size:7.5px;font-weight:800;color:#7c3aed;
                      letter-spacing:4px;text-transform:uppercase;margin-bottom:4px;">TEKLİF</div>
          <div style="font-size:13px;font-weight:800;color:#ffffff;letter-spacing:0.3px;">${QN}</div>
          <div style="font-size:9px;color:#6b7a9c;margin-top:5px;">Tarih: ${today}</div>
          <div style="font-size:9px;color:#6b7a9c;margin-top:2px;">Geçerlilik: ${validTo}</div>
        </td>
      </tr>
    </table>
  </div>

  <div style="
    background:#eef2ff;
    padding:14px 40px;
    border-bottom:2px solid #dde3ff;
  ">
    <table style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="vertical-align:top;padding:0;">
          <div style="font-size:7.5px;font-weight:800;color:#7c3aed;
                      letter-spacing:2.5px;text-transform:uppercase;margin-bottom:5px;">HAZIRLANAN</div>
          <div style="font-size:17px;font-weight:900;color:#0a0f1e;line-height:1.15;">
            ${info.name}
          </div>
          ${info.company
            ? `<div style="font-size:11px;font-weight:600;color:#7c3aed;margin-top:3px;">${info.company}</div>`
            : ''}
          <div style="font-size:9.5px;color:#64748b;margin-top:4px;">
            ${[info.email, info.phone].filter(Boolean).join('&nbsp;&nbsp;·&nbsp;&nbsp;')}
          </div>
        </td>
        <td style="text-align:right;vertical-align:top;padding:0;">
          <div style="font-size:7.5px;color:#94a3b8;margin-bottom:2px;">Hizmet sayısı</div>
          <div style="font-size:26px;font-weight:900;color:#7c3aed;line-height:1;">${svcs.length}</div>
          <div style="font-size:8.5px;color:#7c3aed;">hizmet seçildi</div>
        </td>
      </tr>
    </table>
  </div>

  <div style="padding:20px 40px 0;">

    <table style="width:100%;border-collapse:collapse;margin-bottom:10px;">
      <tr>
        <td style="
          font-size:8px;font-weight:800;color:#7c3aed;
          letter-spacing:3px;text-transform:uppercase;
          white-space:nowrap;padding-right:12px;
        ">HİZMETLER</td>
        <td style="border-bottom:1.5px solid #dde3ff;"></td>
      </tr>
    </table>

    <table style="width:100%;border-collapse:collapse;border-radius:8px;overflow:hidden;">

      <thead>
        <tr style="background:#0f172a;">
          <th style="padding:9px 14px;text-align:left;font-size:8.5px;font-weight:700;
                     color:#ffffff;letter-spacing:1px;text-transform:uppercase;
                     border-radius:8px 0 0 0;">HİZMET</th>
          <th style="padding:9px 14px;text-align:center;font-size:8.5px;font-weight:700;
                     color:#ffffff;letter-spacing:1px;text-transform:uppercase;
                     width:115px;">TÜR</th>
          <th style="padding:9px 14px;text-align:right;font-size:8.5px;font-weight:700;
                     color:#ffffff;letter-spacing:1px;text-transform:uppercase;
                     border-radius:0 8px 0 0;width:120px;">FİYAT</th>
        </tr>
      </thead>

      <tbody>
        ${rows}

        <tr style="background:#f8f9ff;border-top:1.5px solid #dde3ff;">
          <td colspan="2" style="padding:8px 14px;text-align:right;
                                  font-size:10.5px;color:#64748b;">Ara Toplam</td>
          <td style="padding:8px 14px;text-align:right;font-size:12px;
                     font-weight:700;color:#1e293b;white-space:nowrap;">
            ${fmt(pricing.subtotal)}
          </td>
        </tr>

        ${discountRows}

        <tr>
          <td colspan="3" style="padding:0;height:1.5px;
                                  background:linear-gradient(90deg,transparent,#c4b5fd,transparent);"></td>
        </tr>

        <tr style="background:linear-gradient(135deg,#f5f0ff,#eef2ff);">
          <td colspan="2" style="padding:11px 14px;text-align:right;
                                  font-size:11.5px;font-weight:800;color:#0f172a;
                                  letter-spacing:0.5px;text-transform:uppercase;
                                  border-radius:0 0 0 8px;">TOPLAM</td>
          <td style="padding:11px 14px;text-align:right;border-radius:0 0 8px 0;">
            <div style="font-size:20px;font-weight:900;color:#7c3aed;
                        line-height:1;white-space:nowrap;">${fmt(pricing.total)}</div>
            ${pricing.savings > 0 ? `
            <div style="margin-top:3px;">
              <span style="background:#dcfce7;color:#15803d;font-size:8.5px;font-weight:700;
                           padding:2px 8px;border-radius:99px;white-space:nowrap;">
                &#127881; ${fmt(Math.round(pricing.savings))} tasarruf
              </span>
            </div>` : ''}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div style="padding:16px 40px;">
    <table style="width:100%;border-collapse:collapse;">
      <tr>

        <td style="width:48%;vertical-align:top;padding-right:8px;">
          <div style="background:#f8f9ff;border:1px solid #dde3ff;
                      border-radius:10px;padding:13px 15px;">
            <div style="font-size:8px;font-weight:800;color:#7c3aed;
                        letter-spacing:2.5px;text-transform:uppercase;
                        margin-bottom:9px;">ÖDEME PLANI</div>
            <table style="width:100%;border-collapse:collapse;">
              ${payRows}
            </table>
          </div>
        </td>

        <td style="width:52%;vertical-align:top;padding-left:8px;">
          <div style="background:#f8f9ff;border:1px solid #dde3ff;
                      border-radius:10px;padding:13px 15px;">
            <div style="font-size:8px;font-weight:800;color:#7c3aed;
                        letter-spacing:2.5px;text-transform:uppercase;
                        margin-bottom:9px;">TEKLİF ŞARTLARI</div>
            <table style="border-collapse:collapse;">
              ${termItems}
            </table>
          </div>
        </td>

      </tr>
    </table>
  </div>

  ${info.note ? `
  <div style="margin:0 40px 14px;">
    <div style="background:#fffbeb;border:1px solid #fde68a;
                border-radius:8px;padding:10px 14px;">
      <div style="font-size:7.5px;font-weight:800;color:#d97706;
                  letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;">
        MÜŞTERİ NOTU
      </div>
      <div style="font-size:10.5px;color:#78350f;line-height:1.5;">${info.note}</div>
    </div>
  </div>` : ''}

  <div style="padding:0 40px 16px;">
    <table style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="width:45%;vertical-align:bottom;padding-right:30px;">
          <div style="border-top:1.5px solid #e2e8f0;padding-top:7px;">
            <div style="font-size:8.5px;color:#94a3b8;margin-bottom:2px;">Gönderen</div>
            <div style="font-size:11px;font-weight:700;color:#1e293b;">${OWNER_NAME}</div>
            <div style="font-size:9px;color:#7c3aed;margin-top:1px;">${OWNER_TITLE} · ${COMPANY}</div>
          </div>
        </td>
        <td style="width:55%;vertical-align:bottom;padding-left:30px;">
          <div style="border-top:1.5px solid #e2e8f0;padding-top:7px;">
            <div style="font-size:8.5px;color:#94a3b8;margin-bottom:2px;">Müşteri</div>
            <div style="font-size:11px;font-weight:700;color:#1e293b;">${info.name}</div>
            ${info.company
              ? `<div style="font-size:9px;color:#64748b;margin-top:1px;">${info.company}</div>`
              : `<div style="font-size:9px;color:#cbd5e1;">Şirket adı</div>`}
          </div>
        </td>
      </tr>
    </table>
  </div>

  <div style="background:#070c1b;padding:12px 40px;">
    <div style="
      height:2px;margin-bottom:9px;
      background:linear-gradient(90deg,#7c3aed,#8b5cf6,transparent);
    "></div>
    <table style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="font-size:8.5px;color:#4a5882;">
          ${COMPANY}&nbsp;·&nbsp;${OWNER_NAME}&nbsp;·&nbsp;${OWNER_TITLE}
        </td>
        <td style="text-align:center;font-size:8.5px;color:#a78bfa;font-weight:600;">
          ${WEBSITE}
        </td>
        <td style="text-align:right;font-size:8.5px;color:#4a5882;">${QN}</td>
      </tr>
    </table>
  </div>

</div>`
}

export async function generateQuotePDF(customerInfo, pricing) {
  const wrapper = document.createElement('div')
  wrapper.style.cssText = [
    'position:fixed',
    'left:-9999px',
    'top:0',
    'z-index:-9999',
    'pointer-events:none',
    'width:794px',
  ].join(';')
  wrapper.innerHTML = buildHTML(customerInfo, pricing)
  document.body.appendChild(wrapper)

  const page = wrapper.firstElementChild

  await document.fonts.ready
  await new Promise(r => setTimeout(r, 350))

  const canvas = await html2canvas(page, {
    scale:           2,
    useCORS:         true,
    backgroundColor: '#ffffff',
    logging:         false,
    width:           794,
  })

  document.body.removeChild(wrapper)

  const MM_WIDTH  = 210
  const MM_HEIGHT = (canvas.height / canvas.width) * MM_WIDTH

  const doc = new jsPDF({
    orientation: 'portrait',
    unit:        'mm',
    format:      [MM_WIDTH, MM_HEIGHT],
    compress:    true,
  })

  doc.addImage(
    canvas.toDataURL('image/jpeg', 0.93),
    'JPEG',
    0, 0,
    MM_WIDTH,
    MM_HEIGHT
  )

  const safeName = (customerInfo.name || 'musteri')
    .replace(/\s+/g, '_')
    .replace(/[<>:"/\\|?*]/g, '')
  doc.save(`Zenith_Teklif_${safeName}_${new Date().getFullYear()}.pdf`)

  return doc
}

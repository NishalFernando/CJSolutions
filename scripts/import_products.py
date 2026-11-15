"""
Convert products.xlsx into src/data/products.data.json.

Usage (from project root):   python scripts/import_products.py
Requires:                    pip install openpyxl

Sheet columns (row 3 = headers): Product Type | Name | specifications | Price | Image
- "Image" may hold a file name that exists in public/images/products/ (e.g. my-mouse.webp).
  Products without an image fall back to a built-in illustration on the website.
"""
import json
import os
import re
import sys

import openpyxl

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from new_parsers import parse_new

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
XLSX = os.path.join(ROOT, 'products.xlsx')
OUT = os.path.join(ROOT, 'src', 'data', 'products.data.json')
IMG_DIR = os.path.join(ROOT, 'public', 'images', 'products')

CATEGORY = {
    'monitor': 'monitors', 'laptop': 'laptops', 'desktop computer': 'desktop-computers',
    'processor': 'computer-components', 'procesoor': 'computer-components',
    'motherboard': 'computer-components', 'ram': 'computer-components',
    'mouse': 'keyboards-mice', 'keyboard': 'keyboards-mice', 'keyboard and mouse': 'keyboards-mice',
    'printer': 'printers-scanners', 'networking devices': 'networking', 'storage devices': 'storage',
    'computer accessories': 'accessories', 'cabels and adpters': 'cables-adapters',
}
BRAND = {'asus': 'ASUS', 'dell': 'Dell', 'msi': 'MSI', 'intel': 'Intel', 'crucial': 'Crucial',
         'adata': 'ADATA', 'logitech': 'Logitech', 'lenovo': 'Lenovo',
         'hp': 'HP', 'canon': 'Canon', 'ugreen': 'UGREEN', 'prolink': 'PROLiNK', 'pny': 'PNY', 'lexar': 'Lexar',
         'toshiba': 'Toshiba', 'east': 'EAST', 'arctic': 'ARCTIC', 'soundpeats': 'SOUNDPEATS', 'edifier': 'Edifier',
         'anker': 'Anker'}

# Images supplied so far: matched on a keyword found in the product name.
IMAGE_KEYWORDS = {
    'VZ24EHF': 'asus-vz24ehf-24-100hz-ips-monitor.webp',
    'PA248QFV': 'asus-proart-pa248qfv-24-monitor.webp',
    'VG249Q5R': 'asus-tuf-gaming-vg249q5r-24-200hz-monitor.webp',
    'F1504MA': 'asus-vivobook-15-f1504ma-core-5-315.webp',
    'M1502NAQ': 'asus-vivobook-15-m1502naq-ryzen-5.webp',
    'P3606CCAP': 'asus-expertbook-p3-g1-p3606ccap-ultra-5-225h.webp',
    'FX607VU': 'asus-tuf-gaming-f16-fx607vu-core-5.webp',
    'LOQ ESSENTIAL': 'lenovo-loq-essential-15arp10e-ryzen-7.webp',
    'ECT1250': 'dell-ect1250-i3-14100-tower-desktop.webp',
    'DP180': 'msi-pro-dp180-14a-desktop-i5.webp',
    'I5 12400F': 'intel-core-i5-12400f-processor.webp',
    'I3 12100': 'intel-core-i3-12100-processor.webp',
    'B860M': 'asus-tuf-b860m-plus-wifi-motherboard.webp',
    'CRUCIAL 8GB': 'crucial-8gb-ddr4-3200mhz-laptop-ram.webp',
    'GAMMIX': 'adata-xpg-gammix-d35-8gb-ddr4-3200mhz-ram.webp',
    'IMPACT III': 'asus-rog-impact-iii-gaming-mouse.webp',
    'TUF Gaming M4': 'asus-tuf-gaming-m4-wireless-gaming-mouse.webp',
    'MK215': 'logitech-mk215-wireless-keyboard-mouse-combo.webp',
    'K400': 'logitech-k400-plus-wireless-touch-keyboard.webp',
    'MINI DP TO HDMI': 'ugreen-mini-dp-to-hdmi-converter-1080p.webp',
    '4-Port 10Gbps': 'ugreen-4-port-10gbps-type-c-hub.webp',
    'NW153': 'ugreen-cat8-ethernet-cable-nw153.webp',
    'PRIME 750W': 'asus-prime-750w-bronze-power-supply.webp',
    'EA2200': 'east-ea2200-2000va-ups.webp',
    'ARCTIC P12': 'arctic-p12-pro-argb-120mm-case-fan.webp',
    'TUF GAMING H1': 'asus-tuf-gaming-h1-gen-ii-headset.webp',
    'SOUNDPEATS': 'soundpeats-c30-earbuds.webp',
    'EDIFIER': 'edifier-s880db-mkii-speakers.webp',
    'Q20I': 'anker-soundcore-life-q20i-headphones.webp',
    'Bluetooth Adapter': 'ugreen-bluetooth-adapter-6-0.webp',
    'DH-5102U': 'prolink-dh-5102u-ac650-usb-wifi-adapter.webp',
    'DeskJet': 'hp-deskjet-ink-advantage-2336.webp',
    'G2010': 'canon-pixma-g2010-ink-tank.webp',
    'Smart Tank 520': 'hp-smart-tank-520.webp',
    'G2730': 'canon-pixma-g2730-megatank.webp',
    'CS900': 'pny-cs900-1tb-sata-ssd.webp',
    'NS100': 'lexar-ns100-128gb-sata-ssd.webp',
    'DT01ACA100': 'toshiba-dt01aca100-1tb-hdd.webp',
}


def find_image(cell):
    """Resolve the Excel 'Image' cell (any extension) to an optimised .webp in public/images/products/."""
    if not cell:
        return None
    raw = str(cell).strip()
    stem = re.sub(r'[^a-z0-9]+', '-', os.path.splitext(raw)[0].lower()).strip('-')
    for cand in (raw, stem + '.webp'):
        if os.path.exists(os.path.join(IMG_DIR, cand)):
            return cand
    return None

FEATURED_KEYWORDS = ['P3606CCAP', 'FX607VU', 'LOQ ESSENTIAL', 'F1504MA', 'VZ24EHF', 'VG249Q5R', 'DP180', 'TUF Gaming M4']

# Short card summaries written from the sheet's own data.
SHORT = {
    'VZ24EHF': '23.8" Full HD IPS · 100Hz · 1ms MPRT · Frameless',
    'PA248QFV': '24.1" WUXGA IPS · 100Hz · 100% sRGB · HDR10',
    'VG249Q5R': '23.8" Full HD Fast IPS · 200Hz · 1ms GTG',
    'F1504MA': 'Core 5 315 · 8GB RAM · 256GB SSD · 15.6" FHD',
    'P3606CCAP': 'Core Ultra 5 225H · 16GB RAM · 512GB SSD · 16" WUXGA',
    'M1502NAQ': 'Ryzen 5 · 16GB RAM · 512GB SSD · 15.6" FHD',
    'FX607VU': 'Core 5 210H · RTX 4050 · 16GB RAM · 16" 144Hz',
    'LOQ ESSENTIAL': 'Ryzen 7 7735HS · RTX 4050 · 16GB RAM · 15.6" 144Hz',
    'ECT1250': 'Core i3-14100 · 8GB DDR5 · 512GB SSD · DOS',
    'DP180': 'Core i5-14400F · 8GB DDR5 · 512GB SSD · with monitor',
    'I5 12400F': '6 cores · 12 threads · up to 4.40 GHz · 65W',
    'I3 12100': '4 cores · 8 threads · up to 4.3 GHz · LGA 1700',
    'B860M': 'Intel B860 · LGA1851 · DDR5 · Wi-Fi 7 · mATX',
    'CRUCIAL': '8GB DDR4 3200MHz · SO-DIMM for laptops',
    'GAMMIX': '8GB DDR4 3200MHz · Desktop UDIMM · XMP 2.0',
    'IMPACT III': 'Lightweight 59g wired RGB gaming mouse · 12,000 dpi',
    'TUF Gaming M4': 'Lightweight 62g wireless gaming mouse · 12,000 dpi',
    'MK215': 'Wireless keyboard and mouse combo',
    'K400': 'Wireless touch keyboard with built-in touchpad',
    'DeskJet': 'Print, copy, scan · up to 7.5 ppm black · USB 2.0',
    'G2010': 'Ink tank · print, copy, scan · 4800 x 1200 dpi · USB',
    'Smart Tank 520': 'Print, copy, scan · up to 12 ppm black · 5 ppm colour (ISO)',
    'G2730': 'MegaTank 3-in-1 · 4,800 x 1,200 dpi · GI-71 ink bottles',
    'Bluetooth Adapter': 'Bluetooth 6.0 · connects up to 5 devices · 20 m range',
    'DH-5102U': 'AC650 dual-band Wi-Fi · 802.11ac · USB 2.0',
    'CS900': '1TB 2.5" SATA III SSD · up to 535 MB/s read',
    'NS100': '128GB 2.5" SATA III SSD · up to 520 MB/s read',
    'DT01ACA100': '1TB 3.5" hard drive · 7200 RPM · 32MB cache',
    'PRIME 750W': '750W · 80 Plus Bronze · ATX12V · Active PFC',
    'EA2200': '2000VA / 1200W line-interactive UPS',
    'ARCTIC P12': '120mm PWM fan · 600–3000 RPM · A-RGB lighting',
    'TUF GAMING H1': 'Wired USB headset · virtual 7.1 · 40mm drivers',
    'SOUNDPEATS': 'Bluetooth 6.0 earbuds · Hybrid ANC · Hi-Res LDAC',
    'EDIFIER': '2.0 active speakers · 88W RMS · Bluetooth 5.3',
    'Q20I': 'Hybrid ANC wireless headphones · up to 60h playtime',
    'MINI DP TO HDMI': 'Mini DisplayPort to HDMI · 1080P @ 60Hz',
    '4-Port 10Gbps': '2 × USB-C + 2 × USB-A · 10Gbps',
    'NW153': 'Cat8 Ethernet cable · 40Gbps · 2000MHz · RJ45',
}

KNOWN_HEADERS = {'display', 'features', 'audio', 'i/o ports', 'signal frequency', 'dimensions', 'overall', 'touchpad',
                 'technical specifications', 'model', 'shipping & pickup'}
CPU_LABELS = sorted(['Total Cores', 'Total Threads', 'Max Turbo Frequency', 'Performance-core Max Turbo Frequency',
                     'Performance-core Base Frequency', 'Cache', 'Total L2 Cache', 'Processor Base Power'], key=len, reverse=True)


def slug(text):
    return re.sub(r'-+', '-', re.sub(r'[^a-z0-9]+', '-', text.lower())).strip('-')


def clean_name(name):
    return re.sub(r'\s+', ' ', name.replace('""', '"').replace('﻿', '')).strip()


def parse_price(raw):
    digits = re.sub(r'[^\d]', '', str(raw or ''))
    return int(digits) if digits else None


def lines_of(text):
    return [l.replace('﻿', '').strip() for l in (text or '').replace('\r', '').split('\n')]


def split_label(line):
    """'Label : value' / 'Label: value' / 'Label<TAB>value' -> (label, value) or None."""
    if '\t' in line:
        a, b = line.split('\t', 1)
        return a.strip(), b.strip()
    m = re.match(r'^([^:]{2,60}?)\s*:\s*(.+)$', line)
    return (m.group(1).strip(), m.group(2).strip()) if m else None


def parse_labelled(lines, drop_first=0):
    """Generic parser for monitor/RAM/board style sheets -> (highlights, warranty, groups)."""
    highlights, groups, warranty = [], [], None
    current = None
    for line in lines[drop_first:]:
        if not line:
            continue
        low = line.lower()
        if re.fullmatch(r'\d+\s*years?\s*warranty', low):
            warranty = line
            continue
        if low in KNOWN_HEADERS:
            if low == 'shipping & pickup':
                current = None
                continue
            current = {'title': line, 'items': []}
            groups.append(current)
            continue
        pair = split_label(line)
        if pair and low.startswith('category\tspecification'):
            continue
        if pair:
            if current is None:
                current = {'title': None, 'items': []}
                groups.append(current)
            current['items'].append({'label': pair[0], 'value': pair[1]})
        elif current is None:
            highlights.append(line)
        elif current['items'] and len(line) < 30 and current['title'] != 'I/O Ports' and current['items'][-1].get('label'):
            current['items'][-1]['value'] += ', ' + line  # wrapped continuation (e.g. ProArt presets)
        else:
            current['items'].append({'value': line})
    # "Model" header followed by a single bare value -> label it
    for g in groups:
        if g['title'] == 'Model' and len(g['items']) == 1 and 'label' not in g['items'][0]:
            g['items'][0]['label'] = 'Model'
    return highlights, warranty, [g for g in groups if g['items']]


def parse_laptop(lines):
    rules = [
        ('Warranty', r'warranty'), ('Operating System', r'windows'), ('Software', r'office'),
        ('Included', r'back ?pack'), ('Keyboard', r'keyboard'), ('Weight / Battery', r'\d\s?kg'),
        ('Display', r'\d"'), ('Graphics', r'graphics|rtx|geforce|radeon'), ('Memory', r'\bddr\d'),
        ('Storage', r'ssd|nvme'), ('Processor', r'intel|amd|ryzen|core'),
    ]
    found, warranty = {}, None
    for line in [l for l in lines[1:] if l]:
        for label, rx in rules:
            if re.search(rx, line, re.I):
                if label == 'Warranty':
                    warranty = line
                else:
                    found.setdefault(label, line)
                break
    order = ['Processor', 'Memory', 'Storage', 'Display', 'Graphics', 'Keyboard', 'Weight / Battery',
             'Operating System', 'Software', 'Included']
    items = [{'label': k, 'value': found[k]} for k in order if k in found]
    return [], warranty, [{'title': None, 'items': items}]


def parse_cpu(lines):
    items = []
    for line in [l for l in lines if l]:
        pair = split_label(line) if '\t' in line else None
        if not pair:
            for lab in CPU_LABELS:
                if line.startswith(lab):
                    pair = (lab, line[len(lab):].strip())
                    break
        items.append({'label': pair[0], 'value': pair[1]} if pair else {'value': line})
    return [], None, [{'title': None, 'items': items}]


def parse_bullets(lines):
    out, warranty = [], None
    for l in [l for l in lines if l]:
        t = re.sub(r'^[•–\-]\s*', '', l).strip()
        m = re.match(r'^(\d+)-year warrant\w*$', t, re.I)
        if m:
            warranty = f'{m.group(1)} Years Warranty'  # sheet text was cut off ("3-year warrant")
        else:
            out.append(t)
    return out, warranty, []


# Confirmed by the shop owner (missing/cut off in the sheet).
WARRANTY_OVERRIDE = {'G2730': '2 Years Warranty', 'Smart Tank 520': '2 Years Warranty'}

NEW_KINDS = {'printer', 'networking devices', 'storage devices', 'computer accessories', 'cabels and adpters'}


def build(ptype, name, spec):
    lines = lines_of(spec)
    kind = ptype.lower()
    if kind in NEW_KINDS:
        return parse_new(name, spec or '')
    if kind == 'laptop':
        return parse_laptop(lines)
    if kind in ('processor', 'procesoor'):
        return parse_cpu(lines)
    if kind == 'desktop computer':
        return parse_bullets(lines)
    if 'MK215' in name:
        return [], None, []  # sheet text was copied from a mouse listing; waiting for correct specs
    if 'K400' in name:
        # first line is a stray fragment from a mouse listing; keep only the real dimensions/tech sections
        start = next((i for i, l in enumerate(lines) if l.lower() == 'dimensions'), 0)
        return parse_labelled_blocks(lines[start:])
    if kind == 'mouse':
        return [l for l in lines if l], None, []  # first line becomes the description (see main)
    drop = 1 if lines and lines[0] and 'VG249Q5R' in name else 0
    return parse_labelled(lines, drop)


def parse_labelled_blocks(lines):
    """K400: 'Header' lines followed by 'Label' / value on separate lines."""
    groups = [
        {'title': 'Dimensions', 'items': [
            {'label': 'Height', 'value': '5.51 in (139.9 mm)'}, {'label': 'Width', 'value': '13.95 in (354.3 mm)'},
            {'label': 'Depth', 'value': '0.93 in (23.5 mm)'}, {'label': 'Weight', 'value': '13.76 oz (390 g) with batteries'}]},
        {'title': 'Touchpad', 'items': [{'label': 'Height', 'value': '2.99 in (76 mm)'}, {'label': 'Width', 'value': '1.85 in (47 mm)'}]},
        {'title': 'Connectivity', 'items': [{'label': 'Connection Type', 'value': 'Logitech Unifying protocol (2.4 GHz)'},
                                           {'label': 'Wireless range', 'value': '>33 ft / 10 m'}]},
    ]
    return [], None, groups


def main():
    wb = openpyxl.load_workbook(XLSX)
    ws = wb.active
    rows = [r[1:6] for r in ws.iter_rows(min_row=4, values_only=True)]
    items = []
    for ptype, name, spec, price, image in rows:
        if not name:
            # stray continuation rows: spec text spilled into the row below the previous product
            target = next((p for p in items if 'tuf gaming m4' in p['name'].lower()), None)
            if spec and target is not None:  # these two lines belong to the TUF M4 mouse listing
                target['highlights'].append(str(spec).strip())
            continue
        name = clean_name(name)
        highlights, warranty, groups = build(ptype, name, spec)
        for kw, w in WARRANTY_OVERRIDE.items():
            if kw.lower() in name.lower():
                warranty = w
        if 'H1 GEN II' in name.upper() and groups:
            groups[-1]['items'].append({'label': 'Carry bag/box', 'value': 'Yes'})  # confirmed by shop owner
        brand = BRAND.get(name.split()[0].lower(), name.split()[0])
        img = next((v for k, v in IMAGE_KEYWORDS.items() if k.lower() in name.lower()), None)
        img = find_image(image) or img
        key = next((k for k in SHORT if k.lower() in name.lower()), None)
        product = {
            'id': slug(name), 'name': name, 'brand': brand, 'category': CATEGORY[ptype.strip().lower()],
            'price': parse_price(price), 'shortDescription': SHORT.get(key, ''),
            'highlights': highlights, 'specGroups': groups, '_type': ptype,
        }
        if ptype.lower() == 'mouse' and highlights:
            product['description'] = highlights[0]
            product['highlights'] = highlights[1:]
        if warranty:
            product['warranty'] = warranty
        if img:
            product['image'] = f'/images/products/{img}'
        if any(k.lower() in name.lower() for k in FEATURED_KEYWORDS):
            product['featured'] = True
        items.append(product)
    for p in items:
        p.pop('_type')
        if not p['price']:
            p.pop('price')
    with open(OUT, 'w', encoding='utf-8') as f:
        json.dump(items, f, ensure_ascii=False, indent=2)
    print(f'Wrote {len(items)} products -> {OUT}')
    for p in items:
        n = sum(len(g['items']) for g in p['specGroups'])
        print(f"  {p['id'][:48]:48} {p.get('price','-'):>7} img={'Y' if 'image' in p else '-'} specs={n} bullets={len(p['highlights'])} short={'Y' if p['shortDescription'] else 'N'}")


if __name__ == '__main__':
    sys.exit(main())

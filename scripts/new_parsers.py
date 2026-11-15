"""Parsers for the printer / network / storage / accessory / cable rows of products.xlsx."""
import re

WARRANTY_RX = re.compile(r'(\d+)\s*(years?|months?)\s*warranty', re.I)
GROUP_HEADERS = {'system requirements', 'scan', 'copy', 'general specifications', 'performance & specs', 'durability & environment'}
SKIP_LINES = {'feature\tspecification', 'specification field\tdetails', 'specs', 'specifications',
              'applications', 'features and benefits', 'features'}
JUNK = ('ambidextrous', 'antibacterial', 'to be fixed', 'click here')

# Hand-fixes for text the sheet broke across lines (values are the sheet's own).
CANON_G2010_FIXES = [
    ('Print Speed*2\nBased on ISO / IEC 24734\nsummary report\nfor Document Print and Copy Speed Measurement Conditions\tDocument: Col\t',
     'Document: Col\t'),
    ('Document: Col\tESAT / Simplex\t', 'Print speed – colour (ESAT)\t'),
    ('Document: B / W\tESAT / Simplex\t', 'Print speed – B/W (ESAT)\t'),
    ('Document: Col\tFPOT Ready/Simplex\t', 'First print out – colour (ready)\t'),
    ('Document: B / W\tFPOT Ready/Simplex\t', 'First print out – B/W (ready)\t'),
    ('Document: Col\tFPOT Sleep/Simplex\t', 'First print out – colour (sleep)\t'),
    ('Document: B / W\tFPOT Sleep/Simplex\t', 'First print out – B/W (sleep)\t'),
    ('Printable Width\tBordered:\t203.2mm \nBorderless:\t216mm ', 'Printable Width\tBordered 203.2mm · Borderless 216mm'),
    ('Paper Handling (Rear Tray)\n(Number)\tPlain Paper\t', 'Paper handling – plain paper\t'),
    ('System Requirements\n(Please visit www.canon-asia.com to check OS compatibility and to download the latest driver updates)\tWindows:\t',
     'System Requirements\t \nWindows\t'),
    ('Scanning Bit Depth (Input / Output)\tGrayscale:\t16 / 8 bit\nColour:\t48 / 24 bit (RGB each 16 / 8-bit)',
     'Scanning Bit Depth (Input / Output)\tGrayscale 16 / 8 bit · Colour 48 / 24 bit (RGB each 16 / 8-bit)'),
    ('Line Scanning Speed*6\tGrayscale:\t1.5ms/line (300dpi)\nColour:\t3.5ms/line (300dpi)',
     'Line Scanning Speed\tGrayscale 1.5ms/line · Colour 3.5ms/line (300dpi)'),
    ('Scanning Speed*7\tReflective:\nA4 Colour / 300dpi\t19s', 'Scanning Speed (reflective, A4 colour, 300dpi)\t19s'),
    ('Compatible Media\tSize:\tA4, Letter\nType:\tPlain Paper', 'Compatible Media\tA4, Letter · Plain Paper'),
    ('Operating Environment*9\tTemperature:\t5 - 35°C\nHumidity:\t10 - 90% RH (no dew condensation)',
     'Operating Environment\tTemperature 5 - 35°C · Humidity 10 - 90% RH (no dew condensation)'),
    ('Recommended Environment*10\tTemperature:\t15 - 30°C\nHumidity:\t10 - 80% RH (no dew condensation)',
     'Recommended Environment\tTemperature 15 - 30°C · Humidity 10 - 80% RH (no dew condensation)'),
    ('Storage Environment\tTemperature:\t0 - 40°C\nHumidity:\t5 - 95% RH (no dew condensation)',
     'Storage Environment\tTemperature 0 - 40°C · Humidity 5 - 95% RH (no dew condensation)'),
    ('Copy Speed*8\nBased on ISO / IEC 24734.\nClick here for summary report\nClick here for Document Print and Copy Speed Measurement Conditions\tDocument: Colour\nsFCOT / Simplex\t32s\nDocument: Colour\nsESAT / Simplex\t1.7 images per minute',
     'Copy speed – colour (sFCOT)\t32s\nCopy speed – colour (sESAT)\t1.7 images per minute'),
    ('Power Consumption\tConnection to PC\tUSB\nOFF:\t0.2W\nStandby (scanning lamp is off):\n(USB connection to PC)\t0.6W\nStandby (all ports connected, scanning lamp is off)\t0.6W\nCopying*12: G2010\t9W',
     'Power consumption – off\t0.2W\nPower consumption – standby (USB)\t0.6W\nPower consumption – standby (all ports connected)\t0.6W\nPower consumption – copying\t9W'),
]
ALT_LABELS = {
    'G2730': ['Number of Nozzles', 'Ink Bottles (Type/Colours)', 'Maintenance Cartridge', 'Print Heads', 'Maximum Printing Resolution'],
    'DH-5102U': ['Wi-Fi standard', 'Wireless LAN', 'Connect Type'],
    'PRIME 750W': ['Model', 'Intel Form Factor', 'PFC Type', 'Dimensions', 'Efficiency'],
    'H1 GEN II': ['Model', 'Product Type', 'Usage Scenario', 'Interface', 'Connector', 'Support Platform', 'Driver Material',
                  'Driver Size', 'Headphones Impedance', 'Headphones Frequency Response', 'Microphone Pick-up Pattern',
                  'Microphone Sensitivity', 'Microphone Frequency Response', 'AI Noise Cancelling Microphone', 'Channel',
                  'Lighting', 'Aura', 'Foldablility', 'Weight', 'Carry bag/box', 'Extra ear-cushion', 'Color', 'Cable'],
    'EDIFIER': ['Total Output Power (RMS)', 'Driver'],
}
AMBIGUOUS = {'Carry bag/box'}  # sheet lists "Yes / No" with no way to tell which applies
STOP_AT = {'EDIFIER': 'Total Output Power (RMS):', 'DH-5102U': 'Wi-Fi standard', 'PRIME 750W': 'Model'}


def tidy(v):
    v = re.sub(r'[﻿​]', '', v).strip()
    v = re.sub(r'\*\d*', '', v)
    half = len(v) // 2
    if half and v[:half].strip() == v[half:].strip():
        v = v[:half].strip()
    v = re.sub(r'(ppm|sec)\s[12]$', r'\1', v)  # HP footnote markers
    return v.replace('✔️', 'Yes').strip()


def parse_new(name, text):
    if 'G2010' in name:
        for a, b in CANON_G2010_FIXES:
            text = text.replace(a, b)
    text = re.sub(r'[﻿​]', '', text).replace('\r', '')
    warranty = None
    m = WARRANTY_RX.search(text)
    if m:
        n, unit = m.groups()
        warranty = f'{n} {unit.capitalize()} Warranty'
        if 'for the battery' in text.lower():
            warranty += ' (1 Year for the Battery)'
    lines = []
    for raw in text.split('\n'):
        if WARRANTY_RX.search(raw) or re.match(r'^\s*(years?|months?)\s+warranty', raw, re.I) or 'for the battery' in raw.lower():
            continue
        if any(j in raw.lower() for j in JUNK):
            continue
        lines.append(raw)

    key = next((k for k in ALT_LABELS if k.lower() in name.lower()), None)
    highlights = []
    current = {'title': None, 'items': []}
    groups = [current]

    def add(label, value):
        label, value = tidy(label).rstrip(':').strip(), tidy(value)
        if not label or not value or label in AMBIGUOUS or label.lower() == 'warranty':
            return
        label = label[0].upper() + label[1:]
        if label.startswith('(') and current['items']:
            current['items'][-1]['value'] += ' ' + label + ' ' + value
            return
        if label == 'Features':
            highlights.append(value)
            return
        if any(i['label'].lower() == label.lower() for g in groups for i in g['items']):
            return
        current['items'].append({'label': label, 'value': value})

    if key:  # label-list mode: value = every line up to the next known label
        labels = {l.lower(): l for l in ALT_LABELS[key]}
        stop = STOP_AT.get(key)
        started = stop is None
        label, buf = None, []
        for raw in lines:
            ln = tidy(raw)
            if not ln:
                continue
            norm = ln.lower().rstrip(':')
            if not started:
                if norm == stop.lower().rstrip(':'):
                    started = True
                else:
                    highlights.append(ln)
                    continue
            if norm in labels:
                if label:
                    add(label, ', '.join(buf).replace(', (', ' ('))
                label, buf = labels[norm], []
            elif label:
                buf.append(ln)
        if label:
            add(label, ', '.join(buf).replace(', (', ' ('))
    else:
        pending = None
        for raw in lines:
            if not tidy(raw):
                continue
            if pending and '\t' not in raw:
                add(pending, raw)
                pending = None
                continue
            pending = None
            if raw.strip().lower() in SKIP_LINES:
                continue
            head = tidy(raw.split('\t')[0]).rstrip(':')
            has_value = '\t' in raw and raw.split('\t', 1)[1].strip()
            if head.lower() in GROUP_HEADERS and not has_value:
                current = {'title': head, 'items': []}
                groups.append(current)
            elif '\t' in raw:
                label, rest = raw.split('\t', 1)
                rest = ' '.join(p.strip() for p in rest.split('\t') if p.strip())
                if rest:
                    add(label, rest)
                else:
                    pending = label
            elif re.match(r'^[^:]{2,60}:\s*\S', raw.strip()) and len(raw) < 220:
                label, value = raw.strip().split(':', 1)
                if re.match(r'^(top|bottom|left|humidity|temperature)\b', label.strip(), re.I) and current['items']:
                    current['items'][-1]['value'] += ' ' + tidy(raw)
                else:
                    add(label, value)
            elif current['items'] and re.match(r'^(top|bottom|left|humidity|temperature)\b', raw.strip(), re.I):
                current['items'][-1]['value'] += ' ' + tidy(raw)
            else:
                highlights.append(tidy(raw))
    groups = [g for g in groups if g['items']]
    if len(groups) == 1:
        groups[0]['title'] = None
    return highlights, warranty, groups

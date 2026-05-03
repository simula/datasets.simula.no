---
title: ExposureEngine
desc: Oriented Logo Detection and Sponsor Visibility Analytics in Sports Broadcasts
thumbnail: /thumbnails/exposure-engine.jpg
publication: ''
github: 'https://huggingface.co/datasets/SimulaMet-HOST/ExposureEngine'
hidden: false
tasks:
  - detection
  - tracking
---

# ExposureEngine: Oriented Logo Detection & Sponsor Visibility Analytics (Dataset)

[![Dataset](https://img.shields.io/badge/HuggingFace-Dataset-blue)](https://huggingface.co/datasets/SimulaMet-HOST/ExposureEngine)

Rotation-aware **OBB** annotations for sponsor logos in professional soccer broadcasts — built for **sports analytics**, **YOLO OBB training**, and **sponsorship measurement**.

**ExposureEngine** provides high-quality *oriented bounding box (OBB)* polygon annotations of sponsor logos from professional soccer footage to enable accurate **sponsor visibility measurement**, **logo tracking**, and **rotation-aware detection**.

---

## 📂 Dataset Overview

- **Source:** 97 broadcast highlight clips from the *2024 Swedish Elite Soccer League*
- **Frames:** 1,103 curated frames (sampled at 1 FPS)
- **Annotations:** 670 unique sponsor logos with **OBB polygon coordinates** (YOLO format)
- **Coverage:** 32 matches · 16 teams · diverse events: Goals, Shots, Yellow Cards, Offsides, Substitutions
- **Splits:** Train / Validation / Test = **80 / 10 / 10**

---

## 🔍 Why Oriented Bounding Boxes?

OBB captures **rotation**, **skew**, and **perspective** — common in sports due to dynamic camera angles, jersey folds, and slanted boards. This improves **coverage accuracy** and **downstream analytics** over traditional HBB.

---

## 🚀 Applications

- Sports **sponsorship analytics** & reporting
- **YOLO-based** OBB training & benchmarking
- Brand **visibility measurement** in broadcasts
- Content adaptation for **social media** & OTT

---

## 📩 Contact
For inquiries, collaborations, or questions:
- 📧 Mehdi Houshmand: [mehdi@forzasys.com](mailto:mehdi@forzasys.com)
- 📧 Cise Midoglu: [cise@forzasys.com](mailto:cise@forzasys.com)
- 📧 Pål Halvorsen: [paalh@simula.no](mailto:paalh@simula.no)

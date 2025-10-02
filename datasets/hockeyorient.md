---
title: 'HockeyOrient'
desc: 'A Dataset for Ice Hockey Player Orientation Classification'
thumbnail: /thumbnails/hockeyOrient.png
publication: https://dl.acm.org/doi/10.1145/3712676.3718342
github: https://github.com/acmmmsys/2025-HockeyOrient
hidden: false
tags:
  - icehockey
  - pose estimation
  - head orientation
---

# HockeyOrient: A Dataset for Ice Hockey Player Orientation Classification


[![Dataset](https://img.shields.io/badge/HuggingFace-Dataset-blue)](https://huggingface.co/datasets/SimulaMet-HOST/HockeyOrient) 
[![Model](https://img.shields.io/badge/HuggingFace-Model-green)](https://huggingface.co/SimulaMet-HOST/HockeyOrient) 
[![Demo](https://img.shields.io/badge/HuggingFace-Demo-orange)](https://huggingface.co/spaces/SimulaMet-HOST/HockeyOrient)
[![Paper](https://img.shields.io/badge/ACM-Paper-red)](https://doi.org/10.1145/3712676.3718342)

## 🏒 Overview
The **HockeyOrient** dataset consists of **9,700 manually annotated frames** of ice hockey players extracted from the **2023–2024 Swedish Hockey League (SHL) seasons**. Each cropped image is categorized into one of **eight player orientations**, based on the direction of their head relative to the camera. This dataset is designed for **player direction classification**, which can enhance **tracking models, tactical analysis, and AI-driven coaching tools**.

## 📂 Dataset Details
- **Classes**: 8 orientations – **Top, Top-Right, Right, Bottom-Right, Bottom, Bottom-Left, Left, Top-Left**.
- **Annotations**: High-quality **manual annotations**.
- **Source**: **SHL game footage**.
- **Format**: Images stored in **JPEG format**, categorized into separate folders for each class.

## 📥 Access the Dataset
The dataset is hosted on **Hugging Face**:

🔗 **Dataset Path**: [HockeyOrient on Hugging Face](https://huggingface.co/datasets/SimulaMet-HOST/HockeyOrient)

## 🎯 Pretrained Model
We provide a **trained classification model** based on **SqueezeNet**, available on Hugging Face.

🔗 **Trained Model**: [HockeyOrient Model](https://huggingface.co/SimulaMet-HOST/HockeyOrient)

## 🚀 Live Demo
Explore the **HockeyOrient classification demo** on Hugging Face Spaces.

🔗 **HockeyOrient Demo**: [Hugging Face Space](https://huggingface.co/spaces/SimulaMet-HOST/HockeyOrient)

## 🤝 Citation
If you use this dataset or model in your research, please cite:
```bibtex
@inproceedings{HockeyOrient,
    title = {{HockeyOrient: A Dataset for Ice Hockey Player Orientation Classification}},
    author = {Houshmand Sarkhoosh, Mehdi and Gautam, Sushant and Midoglu, Cise and Sabet, Saeed Shafiee and Kupka, Tomas and Halvorsen, Pål},
    publisher = {Association for Computing Machinery},
    booktitle = {Proceedings of the 16th ACM Multimedia Systems Conference},
    address = {New York, NY, USA},
    url = {https://doi.org/10.1145/3712676.3718342},
    isbn = {9798400714672},
    location = {Stellenbosch, South Africa},
    year = {2025},
    doi={10.1145/3712676.3718342}
}
```

## 📩 Contact
For inquiries, collaborations, or questions:
- 📧 Mehdi Houshmand: [mehdi@forzasys.com](mailto:mehdi@forzasys.com)
- 📧 Cise Midoglu: [cise@forzasys.com](mailto:cise@forzasys.com)
- 📧 Pål Halvorsen: [paalh@simula.no](mailto:paalh@simula.no)

---
⚡ **HockeyOrient is part of ongoing AI-driven sports analytics research.**

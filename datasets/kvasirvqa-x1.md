---
title: 'Kvasir-VQA-x1'
desc: 'A Large-Scale Multi-Task Benchmark for GI Tract Visual Question Answering'
thumbnail: /thumbnails/kvasir.jpg
publication:
tags:
  - gastrointestinal
  - endoscopy
  - images
  - VQA
  - multimodal
  - GI
---

The **Kvasir-VQA-x1** dataset is a large-scale extension of the original Kvasir-VQA benchmark. 
It provides **159,484 high-quality Visual Question Answering (VQA) pairs** grounded in **GI endoscopy images**, designed to support research in:
Also see https://github.com/simula/Kvasir-VQA-x1.

- Multimodal medical AI  
- Visual Question Answering (VQA)  
- Explainable diagnostic modeling  
- Caption generation  
- Vision–language model evaluation  
- Hallucination detection and robustness analysis  

Kvasir-VQA-x1 integrates and expands the **HyperKvasir** image collection with a carefully curated pipeline for generating clinically relevant QA pairs using multiple LLMs, expert review, and a multi-stage naturalization and deduplication pipeline.

---

## Download

### HuggingFace Dataset
Access the dataset directly from the HuggingFace Hub:

**Dataset:**  
https://huggingface.co/datasets/SimulaMet/Kvasir-VQA-x1

```python
from datasets import load_dataset
ds = load_dataset("SimulaMet/Kvasir-VQA-x1")
```

### Notebook Demo
A full exploration notebook is available on HuggingFace and can be opened on Google Colab. See https://github.com/simula/Kvasir-VQA-x1.

---

## Dataset Summary

| Component | Details |
|----------|---------|
| **Images** | 6,500 GI endoscopy images |
| **QA Pairs** | **159,484** structured and naturalized VQA pairs |
| **Tasks Supported** | Yes/No, counting, color, instrument presence, anatomical recognition, abnormality detection, multi-choice, free-text |
| **Image Sources** | HyperKvasir (largest open GI dataset) |
| **VQA Generation** | LLM-generated + deduplication + semantic merging + expert verification |
| **Benchmark Goals** | Robustness, hallucination analysis, multi-level clinical reasoning |

This version (x1) introduces **structured complexity levels**, enabling fine-grained evaluation of model reasoning:

- **Level 1** — Direct visual recognition  
- **Level 2** — Contextual localization, multi-attribute composition  
- **Level 3** — Higher-order clinical reasoning  

---

## Key Features

### 1. Large-Scale QA Set (159k+)
Each image is paired with diverse question types such as:

- Binary  
- Counting  
- Color  
- Anatomy  
- Abnormality  
- Instrument  
- Localization  
- Comparative reasoning  

### 2. Multi-Stage Annotation Pipeline

- LLM generation  
- Semantic deduplication (DeBERTa-MNLI + SentenceTransformer)  
- Expert filtering  
- Naturalization and normalization  
- Complexity categorization  

---

## Dataset Structure

Splits:

- **train** — 127,587  
- **validation** — 15,899  
- **test** — 15,998  

Record structure:

```json
{
  "image_id": "HK_0000123",
  "image": "<PIL Image>",
  "question": "How many polyps are visible?",
  "answer": "one",
  "complexity_level": 1,
  "question_type": "counting",
  "source_prompt_family": "guided-natural"
}
```

---

## Downloading Images + Metadata Locally

```python
from datasets import load_dataset
import os, pandas as pd

ds = load_dataset("SimulaMet/Kvasir-VQA-x1")
df = ds['train'].to_pandas()
df.to_csv("metadata.csv", index=False)

os.makedirs("images", exist_ok=True)

for i, row in df.groupby("image_id").first().iterrows():
    img = ds['train'][row.name]['image']
    img.save(f"images/{row['image_id']}.jpg")
```

---

## Terms of Use

Released under **CC BY-NC 4.0** (research + educational use).

### Required Citations

```
@inproceedings{ Kvasir-VQA-x1,
author = {Gautam, Sushant and Riegler, Michael and Halvorsen, P\r{a}l},
title = {Kvasir-VQA-x1:A Multimodal Dataset for Medical Reasoning and Robust MedVQA in Gastrointestinal Endoscopy},
year = {2025},
isbn = {978-3-032-08008-0},
publisher = {Springer-Verlag},
address = {Berlin, Heidelberg},
url = {https://doi.org/10.1007/978-3-032-08009-7_6},
doi = {10.1007/978-3-032-08009-7_6},
booktitle = {Data Engineering in Medical Imaging: Third MICCAI Workshop, DEMI 2025, Held in Conjunction with MICCAI 2025, Daejeon, South Korea, September 27, 2025, Proceedings},
pages = {53–63},
numpages = {11},
keywords = {Medical VQA, Multimodal Dataset, Robust AI, Endoscopy, Visual Perturbations},
location = {Daejeon, Korea (Republic of)}
}

```

---

## Contact

sushant@simula.no
michael@simula.no  
vajira@simula.no  
steven@simula.no  
paalh@simula.no

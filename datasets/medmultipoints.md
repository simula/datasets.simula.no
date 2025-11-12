---
title: 'MedMultiPoints'
desc: 'A Multimodal Dataset for Object Detection, Localization, and Counting in Medical Imaging'
thumbnail: /thumbnails/MedMultiPoints.png
publication: https://arxiv.org/abs/2505.16647
github: https://github.com/Simula/PointDetectCount
tags:
  - medical
  - multimodal
  - detection
  - localization
  - counting
  - microscopy
  - endoscopy
---

The **MedMultiPoints** dataset is a curated **multimodal medical imaging benchmark** designed for **multi-task learning**—spanning **object detection**, **localization**, and **counting** tasks.  
It integrates data from both **endoscopic** (HyperKvasir) and **microscopic** (VISEM-Tracking) modalities to reflect real-world clinical diversity and imaging conditions.

It is introduced in the paper:  
**"Point, Detect, Count: Multi-Task Medical Image Understanding with Instruction-Tuned Vision-Language Models"**  
📍 *Presented at IEEE CBMS 2025, Madrid, Spain*  
→ [Project Page & Code](https://github.com/Simula/PointDetectCount)  
→ [📄 Paper (arXiv)](https://arxiv.org/abs/2505.16647)

---

## 🧩 Dataset Summary

| Component | Details |
|------------|----------|
| **Images** | 10 600 endoscopic and microscopic medical images |
| **Tasks** | Object Detection • Point Localization • Object Counting |
| **Annotations** | Bounding boxes, point coordinates, count labels, and class labels |
| **Modalities** | Endoscopy (GI) and Microscopy |
| **Format** | JSONL instruction-style annotations for VLM and multi-task pipelines |
| **Intended Use** | Multi-task, instruction-based, and multimodal medical AI research |

---

## 📚 Features

- 🩻 **Multi-type annotations** per image:  
  - `bbox_2d`: Bounding boxes for detection  
  - `point_2d`: Points for localization  
  - `count`: Object counts  
- 🔗 Designed for **Vision-Language Models (VLMs)** and **instruction-tuned frameworks**  
- 🧠 Enables **cross-task supervision**—learning from counting, detection, and localization jointly  

---

## 🧾 Data Schema

| Field | Type | Description |
|-------|------|-------------|
| `image` | Image | Raw medical image |
| `image_sha256` | string | SHA-256 hash for integrity |
| `img_size` | [int, int] | Original image width and height |
| `points` | list | List of `[x, y]` point annotations |
| `bbox` | list | List of `[x1, y1, x2, y2]` bounding boxes |
| `count` | int | Number of objects in the image |
| `label` | string | Object/class label (e.g., `polyps`, `sperm`) |
| `collection_method` | string | Task type (`counting`, `detection`, etc.) |
| `classification` | string | Annotation description (`pathological-findings`, etc.) |
| `organ` | string | Target organ (`Lower GI`, `Microscopy`, etc.) |

---

## 🎯 Supported Tasks

- 🔲 **Object Detection** — bounding-box prediction  
- 📍 **Localization** — point coordinate prediction  
- 🔢 **Counting** — regression on object counts  
- 🧠 **Multimodal Instruction-Based Learning** — unified multi-task training  

---

## 💾 Download

### Hugging Face Dataset

**Dataset:**  
[https://huggingface.co/datasets/SimulaMet/MedMultiPoints](https://huggingface.co/datasets/SimulaMet/MedMultiPoints)

```python
from datasets import load_dataset

ds = load_dataset("SimulaMet/MedMultiPoints")["train"]
sample = ds[0]

image = sample["image"]
bbox = sample["bbox"]
points = sample["points"]
count = sample["count"]
```

**Instruction-Fused JSONL Files**  
- [`multi-task-train.jsonl`](https://huggingface.co/datasets/SimulaMet/MedMultiPoints/resolve/main/instruction_dataset/multi-task-train.jsonl)  
- [`multi-task-test.jsonl`](https://huggingface.co/datasets/SimulaMet/MedMultiPoints/resolve/main/instruction_dataset/multi-task-test.jsonl)

---

## 🧠 Example Entry

```json
{
  "image_sha256": "71179abc4b011cc99bddb3344e3e114765b32bdf77e78892f046026d785a4bdb",
  "img_size": [622, 529],
  "points": [[234, 171.5]],
  "bbox": [[38, 5, 430, 338]],
  "count": 1,
  "label": "polyps",
  "collection_method": "counting",
  "classification": "pathological-findings",
  "organ": "Lower GI"
}
```

---

## 📜 Terms of Use

Released under **CC BY-NC 4.0** — for research and educational use.

---

## 🧾 Citation

If you use this dataset, please cite:

```bibtex
@incollection{Gautam,
  author    = {Gautam, Sushant and Riegler, Michael A. and Halvorsen, P{a}l},
  title     = {Point, Detect, Count: Multi-Task Medical Image Understanding with Instruction-Tuned Vision-Language Models},
  booktitle = {2025 IEEE 38th International Symposium on Computer-Based Medical Systems (CBMS)},
  publisher = {IEEE},
  pages     = {18--20},
  doi       = {10.1109/CBMS65348.2025.00090}
}
```

---

## 📫 Contact

For questions, please reach out to:  
📧 [sushant@simula.no](mailto:sushant@simula.no)

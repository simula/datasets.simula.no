---
title: 'SoccerChat'
desc: 'A Multimodal Video-Text Dataset for Natural Language Soccer Game Understanding'
thumbnail: /thumbnails/SoccerChat.png
publication: https://arxiv.org/abs/2505.16630
github: https://github.com/simula/SoccerChat
tags:
  - soccer
  - video
  - multimodal
  - text
  - event-detection
  - reasoning
  - synthetic
---

**SoccerChat** is a multimodal dataset for **video–language understanding** in the context of **soccer match analysis**.  
It enables training and evaluation of large vision–language models (VLMs) for **event detection**, **temporal reasoning**, and **natural language generation** over real-world broadcast video clips.

Introduced in the paper:  
📄 **"SoccerChat: Integrating Multimodal Data for Enhanced Soccer Game Understanding"**  
📰 *arXiv preprint, May 2025*  
→ [Paper (arXiv:2505.16630)](https://arxiv.org/abs/2505.16630)  
→ [GitHub Project Page](https://github.com/simula/SoccerChat)  
→ [Trained Model (Qwen2-VL-7B)](https://huggingface.co/SimulaMet/SoccerChat-qwen2-vl-7b)  
→ [Web Demo (Colab)](https://colab.research.google.com/github/Simula/SoccerChat/blob/main/notebooks/WebUI.ipynb)

---

## ⚽ Dataset Summary

| Component | Details |
|------------|----------|
| **Total Examples** | 89,000 (train: 85,220 / validation: 4,625) |
| **Modality** | Video + Text |
| **Tasks** | Event Detection • Video Question Answering • Text Generation |
| **Languages** | English |
| **Video Format** | Short broadcast snippets (~5–15 seconds) |
| **Total Size** | ~48 GB (videos) |
| **Annotation Fields** | Video clip, natural language query, model response, and event tags |
| **License** | Research use (CC BY-NC 4.0) |

Each example includes:
- 🎞️ `video` — soccer match video snippet  
- 💬 `query` — natural language question or prompt  
- 🧠 `response` — generated or annotated answer  
- ⚡ `events` — list of SoccerNet event tags (e.g., `Goal`, `Card`, `Foul`)  
- 📂 `path` — relative file path within `/videos/`

---

## 📁 Dataset Structure

| Split | Examples | Size |
|--------|-----------|------|
| **train** | 85,220 | 36.7 MB (metadata only) |
| **validation** | 4,625 | 1.47 MB (metadata only) |

Videos must be downloaded separately (see below).

---

## 💾 Download Instructions

Clone from Hugging Face using Git LFS:

```bash
git lfs install
git clone https://huggingface.co/datasets/SimulaMet/SoccerChat
```

> 📦 Videos are stored under `SoccerChat/videos/` (~48 GB total)

---

## 🧮 Data Fields

| Field | Type | Description |
|--------|------|-------------|
| `video` | Video | Video snippet of soccer event |
| `query` | string | Natural language question |
| `response` | string | Natural language answer |
| `events` | list[string] | Associated SoccerNet event types |
| `path` | string | Relative path to video file |

---

## 🔄 Convert to JSONL (for MS-Swift or other VLMs)

```python
import os, json
from datasets import load_dataset
import pandas as pd

base = "/content/SoccerChat/videos"
ds = load_dataset("SimulaMet/SoccerChat")

for split, out_file in [("train", "SoccerChat_train.jsonl"), ("validation", "SoccerChat_valid.jsonl")]:
    df = ds[split].to_pandas()
    df["query"] = "<video>" + df["query"]
    df["videos"] = df["path"].apply(lambda p: [os.path.join(base, os.path.basename(p))])
    df[["query", "response", "videos"]].to_json(out_file, orient="records", lines=True)
```

---

## 🧠 Training & Evaluation (Example with MS-Swift)

### 🏋️ Training Example (Qwen2-VL-7B)

```bash
NFRAMES=24 MAX_PIXELS=100352 NPROC_PER_NODE=4 swift sft   --model_type qwen2-vl-7b-instruct   --model_id_or_path qwen/Qwen2-VL-7B-Instruct   --sft_type lora   --dataset SoccerChat_train.jsonl   --num_train_epochs 5   --batch_size 14   --deepspeed default-zero2   --eval_steps 100   --dataset_test_ratio 0.05
```

### 📊 Evaluation

```bash
NFRAMES=24 MAX_PIXELS=100352 swift infer   --ckpt_dir checkpoint-dir   --load_dataset_config true   --merge_lora true   --val_dataset SoccerChat_valid.jsonl
```

---

## 📜 Terms of Use

Released under **CC BY-NC 4.0** — for non-commercial research and educational purposes only.

---

## 🧾 Citation

If you use this dataset, please cite:

```bibtex
@article{Gautam2025May,
  author = {Gautam, Sushant and Midoglu, Cise and Thambawita, Vajira and Riegler, Michael A. and Halvorsen, P{a}l and Shah, Mubarak},
  title = {{SoccerChat: Integrating Multimodal Data for Enhanced Soccer Game Understanding}},
  journal = {arXiv},
  year = {2025},
  month = may,
  eprint = {2505.16630},
  doi = {10.48550/arXiv.2505.16630}
}
```

---

## 📬 Contact

For any queries or collaborations, please contact:  
📧 [sushant@simula.no](mailto:sushant@simula.no)  
🌐 [sushant.info.np](https://sushant.info.np)

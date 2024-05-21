# datasets.simula.no
A collection of open datasets published by Simula Research Laboratory and SimulaMet.

Currently, we have published the following datasets: 

**Medical and Biology Datasets**
* Depresjon, The Depresjon Dataset. [ [publication](https://dl.acm.org/doi/10.1145/3204949.3208125) ]
* HyperKvasir, The Largest Gastrointestinal Dataset. [ [publication](https://www.nature.com/articles/s41597-020-00622-y) ]
* HYPERAKTIV, A Motor Activity Database of Patients with ADHD. [ [publication](https://dl.acm.org/doi/10.1145/3458305.3478454) ]
* KvasirCapsule SEG, A Capsule Endoscopy Segmentation Dataset. [ [publication](https://arxiv.org/pdf/2104.11138) ]
* Cellular, A cell autophagy dataset. [ [publication](https://github.com/simula/cellular) ]
* GastroVision, A multicenter dataset. [ [publication](https://arxiv.org/abs/2307.08140) ]
* Nerthus, A Bowel Preparation Quality Video Dataset. [ [publication](https://dl.acm.org/do/10.1145/3193165/abs/) ]
* Kvasir Capsule, The largest gastrointestinal PillCAM dataset. [ [publication](https://www.nature.com/articles/s41597-021-00920-z) ]
* Kvasir Instrument, A gastrointestinal instrument Dataset. [ [publication](https://link.springer.com/chapter/10.1007/978-3-030-67835-7_19) ]
* Kvasir SEG, Segmented Polyp Dataset for Computer Aided Gastrointestinal Disease Detection. [ [publication](https://dl.acm.org/doi/10.1007/978-3-030-37734-2_37) ]
* Kvasir, A Multi-Class Image-Dataset for Computer Aided Gastrointestinal Disease Detection. [ [publication](https://dl.acm.org/do/10.1145/3193289/abs/) ]
* Psykose, A Motor Activity Database of Patients with Schizophrenia. [ [publication](https://ieeexplore.ieee.org/document/9182896) ]
* VISEM QC, A sperm quality control dataset.
* VISEM, A Multimodal Video Dataset of Human Spermatozoa. [ [publication](https://dl.acm.org/doi/10.1145/3304109.3325814) ]

**Sport Datasets**
* Alfheim, Soccer video and player position dataset. [ [publication](https://dl.acm.org/doi/10.1145/2557642.2563677) ]
* ARX, A Text-Classification Dataset Consisting of Norwegian Soccer Articles from VG and TV2. [ [publication](https://ieeexplore.ieee.org/abstract/document/8877417/) ]
* Heimdallr, A Dataset For Sport Analysis.
* ScopeSense, A 8.5-month sport, nutrition, and lifestyle lifelogging dataset.
* Soccer Summarization, Soccer game captions and summary in English for game summarization. [ [publication](https://dl.acm.org/doi/10.1145/3552463.3557019) ]
* SoccerMon, Subjective and objective data collected over two years from two different elite women´s soccer teams.
* SoccerSum, The SoccerSum Dataset for Automated Detection, Segmentation, and Tracking of Objects on the Soccer Pitch [ [publication](http://localhost:3000/---) ]
* PMData , A lifelogging dataset of 16 persons during 5 months using Fitbit, Google Forms and PMSys.
* TACDEC, TACDEC: Dataset of Tackle Events in Soccer Game Videos [ [publication](https://dl.acm.org/doi/10.1145/3625468.3652166) ]

**Other Datasets**
* Anarchy Online, Server-side Network Traffic from Anarchy Online: Analysis, Statistics and Applications. [ [publication](https://datasets.simula.no/ao/mmsys2012-dataset.pdf) ]
* European Cloud Cover, A dataset containing reanalysis data from ERA5 and satellite retrievals from METeosat Second Generation. [ [publication](https://www.mdpi.com/2504-2289/5/4/62/pdf) ]
* Eye Tracker, A Serious Game Based Dataset. [ [publication](http://ceur-ws.org/Vol-1345/gamifir15_5.pdf) ]
* HSDPA, HSDPA-bandwidth logs for mobile HTTP streaming scenarios.
* HTAD, A Home-Tasks Activities Dataset with Wrist-accelerometer and Audio Features. [ [publication](https://link.springer.com/chapter/10.1007/978-3-030-67835-7_17) ]
* Image Sentiment, A dataset for image sentiment analysis. [ [publication](https://arxiv.org/pdf/2009.03051.pdf) ]
* Njord, A fishing boat dataset.
* Right Inflight, A Dataset for Exploring the Automatic Prediction of Movies Suitable for a Watching Situation.
* THREAT, A Large Annotated Corpus for Detection of Violent Threats.
* Toadstool, A Dataset for Training Emotional and Intelligent Machines Playing Super Mario Bros. [ [publication](https://dl.acm.org/doi/10.1145/3339825.3394939) ]
* WICO Graph Dataset, A Labeled Dataset of Twitter Subgraphs based on Conspiracy Theory and 5G-Corona Misinformation Tweets. [ [publication](https://dl.acm.org/doi/10.1145/3472720.3483617) ]
* WICO Text, A labeled dataset of conspiracy theory and 5G-corona misinformation tweets. [ [publication](https://dl.acm.org/doi/abs/10.1145/3472720.3483617) ]

## How to contribute
To add a new **dataset**, follow these steps:

1. **Fork the Repository:** Fork this repository to your GitHub account.
2. **Create a Markdown File:** In your forked repository, navigate to the `datasets` folder and create a new Markdown file (`.md`) for your dataset. The file name should be descriptive of the dataset.
3. **Add Dataset Information:** Copy and paste the following template into your Markdown file:
   ```markdown
   ---
   title: <dataset name>
   desc: <dataset description>
   thumbnail: <dataset thumbnail>
   publication: <link to publication>
   github: <link to github>
   tags:
     - <list of tags>
   ---
   ```
   Fill in the template with the appropriate information about your dataset.
4. **Add a Dataset Thumbnail** Add a thumbnail to the dataset that will be displayed on the main page. The thumbnail should use a 16:9 aspect ratio, like `320 x 180` or `640 x 360` pixels, and be placed under `public/thumbnails`.
5. **Create a Pull Request:** Once you have added the Markdown file and filled in the dataset information, commit your changes. Push the changes to your forked repository. Create a pull request to merge your changes into the main repository.

## Contact
If you have any questions or need assistance, please open an issue in the repository or contact steven@simula.no.

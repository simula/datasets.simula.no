---
title: 'HSDPA'
desc: 'HSDPA-bandwidth logs for mobile HTTP streaming scenarios.'
thumbnail: thumbnails/hsdpa-bandwidth-traces.jpg
tags:
  - networks
  - streaming 
---

This archive contains logs from TCP streaming sessions in Telenor's 3G/HSDPA mobile wireless network in Norway. In each test, adaptive video streams were downloaded at maximum speed (no throttling, no buffer limit). The video segment duration was fixed to 2 seconds. The tests were performed in the period 2010-09-13 to 2011-04-21.

Additionally, the dataset comes with an HTTP bandwidth trottling module for the Apache web server. This means that you can make apache limit the bandwidth according to the bandwidths measured in the logs provided here.

## Available logs
The logs are grouped according to their routes, and which type of transportation was used. Note that the maps are scaled in different direction in this web-page to fit into the table. Note also that some paths only have one measurement, i.e., the bandwidth plot does not have a standard deviation.

| Transportation | Start location | Destination location | Map | Average observed  bandwidth | Logs |
| --- | --- | --- | :---: | :---: | :---: |
| Bus | Ljansbakken | Jernbanetorget | <img style="height:200px;" src="https://datasets.simula.no/downloads/hsdpa-tcp-logs/figs/mosseveien-ljan-oslo.jpg" /> | <img style="height:200px;" src="https://datasets.simula.no/downloads/hsdpa-tcp-logs/figs/bw_ljansbakken-jernbanetorget.png" /> | [LOGS](https://datasets.simula.no/downloads/hsdpa-tcp-logs/bus.ljansbakken-oslo) |
| Metro | Kalbakken | Jernbanetorget | <img style="height:200px;" src="https://datasets.simula.no/downloads/hsdpa-tcp-logs/figs/map-metro.jpg" /> | <img style="height:200px;" src="https://datasets.simula.no/downloads/hsdpa-tcp-logs/figs/bw_kalbakken-jernbanetorget.png" /> Note that the dotted part in the map is below the ground, i.e., in a tunnel. The signal strength was very low and thus, consequently also the measured bandwidth | [LOGS](https://datasets.simula.no/downloads/hsdpa-tcp-logs/metro.kalbakken-jernbanetorget)
| Tram | Ljabru | Jernbanetorget | <img style="height:200px;" src="https://datasets.simula.no/downloads/hsdpa-tcp-logs/figs/map-tram.jpg" /> | <img style="height:200px;" src="https://datasets.simula.no/downloads/hsdpa-tcp-logs/figs/bw_ljabru-jernbanetorget.png" /> | [LOGS](https://datasets.simula.no/downloads/hsdpa-tcp-logs/tram.ljabru-jernbanetorget) |
| Tram | Jernbanetorget | Ljabru | <img style="height:200px;" src="https://datasets.simula.no/downloads/hsdpa-tcp-logs/figs/jernbanetorget-ljabru.jpg" /> | <img style="height:200px;" src="https://datasets.simula.no/downloads/hsdpa-tcp-logs/figs/bw_jernbanetorget-ljabru.png" /> | [LOGS](https://datasets.simula.no/downloads/hsdpa-tcp-logs/tram.jernbanetorget-ljabru) |
| Tram | Jernbanetorget | University hostpital | <img style="height:200px;" src="https://datasets.simula.no/downloads/hsdpa-tcp-logs/figs/jernbanetorget-ljabru.jpg" /> | <img style="height:200px;" src="https://datasets.simula.no/downloads/hsdpa-tcp-logs/figs/bw_jernbanetorget-ljabru.png" /> | [LOGS](https://datasets.simula.no/downloads/hsdpa-tcp-logs/tram.jernbanetorget-universitetssykehuset) |
| Ferry | Nesoddtangen | Aker brygge | <img style="height:200px;" src="https://datasets.simula.no/downloads/hsdpa-tcp-logs/figs/map-ferry.jpg" /> | <img style="height:200px;" src="https://datasets.simula.no/downloads/hsdpa-tcp-logs/figs/bw_nesodden-akerbrygge.png" /> | [LOGS](https://datasets.simula.no/downloads/hsdpa-tcp-logs/ferry.nesoddtangen-oslo) |
| Car | Aarnes | Elverum | <img style="height:200px;" src="https://datasets.simula.no/downloads/hsdpa-tcp-logs/figs/elverum.jpg" /> | <img style="height:200px;" src="https://datasets.simula.no/downloads/hsdpa-tcp-logs/figs/bw_aarnes-elverum.png" /> | [LOGS](https://datasets.simula.no/downloads/hsdpa-tcp-logs/car.aarnes-elverum) |
| Car | Oslo | Grimstad | <img style="height:200px;" src="https://datasets.simula.no/downloads/hsdpa-tcp-logs/figs/oslo-grimstad.png" /> | <img style="height:200px;" src="https://datasets.simula.no/downloads/hsdpa-tcp-logs/figs/bw_oslo-grimstad.png" /> | [LOGS](https://datasets.simula.no/downloads/hsdpa-tcp-logs/car.oslo-grimstad) |
| Car | Snaroya | Smestad | <img style="height:200px;" src="https://datasets.simula.no/downloads/hsdpa-tcp-logs/figs/smestad.jpg" /> | <img style="height:200px;" src="https://datasets.simula.no/downloads/hsdpa-tcp-logs/figs/bw_snaroya-smestad.png" /> | [LOGS](https://datasets.simula.no/downloads/hsdpa-tcp-logs/car.snaroya-smestad) |
| Train | Oslo | Vestby | <img style="height:200px;" src="https://datasets.simula.no/downloads/hsdpa-tcp-logs/figs/oslo-vestby.jpg" /> | <img style="height:200px;" src="https://datasets.simula.no/downloads/hsdpa-tcp-logs/figs/bw_oslo-vestby.png" /> | [LOGS](https://datasets.simula.no/downloads/hsdpa-tcp-logs/train.oslo-vestby) |
| Train | Vestby | Oslo | <img style="height:200px;" src="https://datasets.simula.no/downloads/hsdpa-tcp-logs/figs/vestby-oslo.jpg" /> | <img style="height:200px;" src="https://datasets.simula.no/downloads/hsdpa-tcp-logs/figs/bw_vestby-oslo.png" /> | [LOGS](https://datasets.simula.no/downloads/hsdpa-tcp-logs/train.vestby-oslo) |


## Log format
The logs have the following format:

        1289406399 549692 59.851754 10.781778 248069 1008
        1289406400 550772 59.851864 10.781833 191698 1080
        1289406401 551773 59.851964 10.781901 280579 1001
        1289406402 552893 59.85206  10.781969 248971 1120

Here, the different columns have the following meaning:

* Unix timestamps (number of seconds since 1970-01-01) are given by column 1.
* A monotonically increasing timestamp in milliseconds since some unspecified startingpoint is given by column 2
* GPS positions are given by column 3 and 4. The latitude in decimal degrees is given by column 3 and the longitude in decimal degrees is given by column 4.
* Column 5 contains the number of bytes received since the previous measurement (the above line).
* Column 6 contains the number of milliseconds elapsed since the previous measurement (the above line). This is actualy the difference between the values in column 2 for this and the previous line.
This means that for example to get kilobytes per second for a specific sample, divide column 5 by column 6.

## HTTP bandwidth trottling module for the Apache web server
To emulate identical network behaviour as for example measured in our bandwidth logs for video streaming sessions using adaptive HTTP streaming, we have created a HTTP bandwidth trottling module for Apache. This module takes as input a bandwidth log, like the logs available in this dataset, that contains a single kbit/s number for every second of the session. After loading the bandwidth log, the first HTTP request starts the session, and then, at time T after the session starts, the web server's maximum throughput for the next second will be B(T), where B(T) is the bandwidth at time T in the log that was used as input to the throttling module.
How to install and use the trottling modile is described in the package. The module requires Apache and Mod_python, and to load the module when Apache starts, add the following to the Apache configuration file:

        < Directory /var/www>
                SetHandler mod_python
                PythonHandler httpthrottle
        < /Directory>

Then, copy httpthrottle.py and httpthrottle.conf to /var/www.
After installation, simply edit the logfile argument in the httpthrottle.conf file to point to the bandwidth log file you wish to use. Then, convert the logs into a pure kbit/s log using make_pure_bwlog.pl and run the apache server.

## If you use our dataset or trottling module, please cite the dataset
If you use our dataset, please site the dataset, e.g., using the TOMCCAP paper or MMSys dataset paper listed below.

## Publications where the logs are used
These bandwidth measurements are used in several publications, including:
* "Commute Path Bandwidth Traces from 3G Networks: Analysis and Applications" (dataset)
Haakon Riiser, Paul Vigmostad, Carsten Griwodz, Pål Halvorsen
Proceedings of the International Conference on Multimedia Systems (MMSys), Oslo, Norway, Feruary/March 2013, pp. 114-118
[\[pdf\]](http://home.ifi.uio.no/paalh/publications/files/mmsys2013-dataset.pdf)
* "Video Streaming Using a Location-based Bandwidth-Lookup Service for Bitrate Planning"
Haakon Riiser, Tore Endestad, Paul Vigmostad, Carsten Griwodz, Pål Halvorsen
ACM Transactions on Multimedia Computing, Communications and Applications (TOMCCAP), Vol. 8, No. 3, July 2012, Article No. 24 (accepeted for publication February 2011)
[\[pdf\]](http://home.ifi.uio.no/paalh/publications/files/tomccap-bw-lookup.pdf) [\[DOI: 10.1145/2240136.2240137\]](http://dx.doi.org/10.1145/2240136.2240137)
* "A Comparison of Quality Scheduling in Commercial Adaptive HTTP Streaming Solutions on a 3G Network"
Haakon Riiser, Håkon S. Bergsaker, Paul Vigmostad, Carsten Griwodz, Pål Halvorsen
Proceeding of the ACM Workshop on Mobile Video (MoVid), Chapel Hill, NC, USA, February 2012, pp. 25-30
[\[pdf\]](http://home.ifi.uio.no/paalh/publications/files/movid2012.pdf)
* "Bitrate and video quality planning for mobile streaming scenarios using a GPS-based bandwidth lookup service"
Haakon Riiser, Paul Vigmostad, Carsten Griwodz, Pål Halvorsen
Proceedings of the IEEE International Conference on Multimedia and Expo (ICME), Barcelona, Spain, July 2011
[\[pdf\]](http://home.ifi.uio.no/paalh/publications/files/icme2011.pdf) [\[DOI: 10.1109/ICME.2011.6012045\]](http://dx.doi.org/10.1109/ICME.2011.6012045)
* "Demo: Quality-Adaptive Video Streaming With Dynamic Bandwidth Aggregation on Roaming, Multi-Homed Clients" (demo)
Kristian Evensen, Andreas Petlund, Haakon Riiser, Paul Vigmostad, Dominik Kaspar, Carsten Griwodz, Pål Halvorsen
Proceedings of the ACM International Conference on Mobile Systems, Applications and Services (MobiSys), Washington, DC, USA, June/July 2011, pp. 355-356
[\[pdf\]](http://home.ifi.uio.no/paalh/publications/files/mobisys11-demo.pdf)
* "Mobile Video Streaming Using Location-Based Network Prediction and Transparent Handover"
Kristian Evensen, Andreas Petlund, Haakon Riiser, Paul Vigmostad, Dominik Kaspar, Carsten Griwodz, Pål Halvorsen
Proceedings of the International Workshop on Network and Operating Systems Support for Digital Audio and Video (NOSSDAV), Vancouver, British Columbia, Canada, June 2011, pp. 21-26
[\[pdf\]](http://home.ifi.uio.no/paalh/publications/files/nossdav2011.pdf)
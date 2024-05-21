import {
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { spotPageDetails } from 'src/app/interfaces/common/spot.interface';

@Component({
  selector: 'app-spot',
  templateUrl: './spot.component.html',
  styleUrls: ['./spot.component.scss'],
})
export class SpotComponent implements OnInit {
  id: string;
  subRouteOne: Subscription;
  type: string;
  subRouteUrl: string;
  filteredData: spotPageDetails
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subRouteUrl = this.router.url;
    // GET PAGE FROM QUERY
    this.type = this.router.url.split('/')[1];
    this.subRouteOne = this.activatedRoute.params.subscribe((qParam) => {
      this.id = qParam['id'];
      this.filteredData = this.data.find((item) => {
        return (
          item.spot.toLowerCase() === this.id && item.service === this.type
        );
      });
      this.cdr.detectChanges();
    });
  }
  data:spotPageDetails[] = [
    {
      spot: 'Aalborg',
      spotType: 'zone.name',
      service: 'escort',
      pageTitle: 'Escort Aalborg',
      heading: 'Her finder du de nyeste og bedste escort annoncer i Aalborg',
      firstPara:
        'Er du på udkig efter escort annoncer i Aalborg? Her finder du listen over alle escort, massage, BDSM og trans annoncer i Aalborg og Nordjylland. Hvis du søger efter escort annoncer i andre dele af Danmark,',
      secondPara: 'Hvis du vil bruge filter,',
      thirdPara:
        'Ønsker du at oprette en profil på Myescort.dk eller oprette en annonce,',
    },
    {
      spot: 'Aalborg',
      spotType: 'zone.name',
      service: 'massage',
      pageTitle: 'Massage Aalborg',
      heading: 'Søger du massage i Aalborg? Se massage annoncer her:',
      firstPara:
        'Er du på udkig efter massage annoncer i Aalborg? Her finder du listen over alle escort, massage, BDSM og trans annoncer i Aalborg og Nordjylland. Hvis du søger efter massage annoncer i andre dele af Danmark,',
      secondPara: 'Hvis du vil bruge filter,',
      thirdPara:
        'Ønsker du at oprette en profil på Myescort.dk eller oprette en annonce,',
    },
    {
      spot: 'Aarhus',
      spotType: 'zone.name',
      service: 'escort',
      pageTitle: 'Escort Aarhus',
      heading: 'Se de nyeste escort og massage annoncer i Aarhus her:',
      firstPara:
        'Her finder du alle escort & sex annoncer i nærheden af Aarhus. I Aarhus kan du finde mange escort piger, sex annoncer fra både kvinder og mænd, BDSM dominas annoncer og mangle andre. Hvis du vil bruge filter,',
      secondPara: 'Søger du escort i andre dele af Danmark,',
      thirdPara: 'Ønsker du at oprette en annonce, så',
    },
    {
      spot: 'Aarhus',
      spotType: 'zone.name',
      service: 'massage',
      pageTitle: 'Massage Aarhus',
      heading: 'Har du brug for massage i Aarhus?',
      firstPara:
        'Hos Myescort.dk finder du bedste erotiske massage i Odense og på Fyn. Vi har altid nye massage, escort og sex annoncer klar til dig. Brug søgefunktionen, hvis du søger andre former for escort eller massage.',
      secondPara: 'Hvis du vil bruge filter,',
      thirdPara:
        'Ønsker du at oprette en profil på Myescort.dk eller oprette en annonce,',
    },
    {
      spot: 'Valby',
      spotType: 'zone.name',
      service: 'escort',
      pageTitle: 'Escort Valby',
      heading: 'Se de nyeste escort og massage annoncer i Valby her:',
      firstPara:
        'Her finder du alle escort & sex annoncer i Valby. I Valby kan du finde mange escort piger, sex annoncer fra både kvinder og mænd, BDSM dominas annoncer og mangle andre. Hvis du vil bruge filter,',
      secondPara: 'Søger du escort i andre dele af Danmark,',
      thirdPara: 'Ønsker du at oprette en annonce, så',
    },
    {
      spot: 'Valby',
      spotType: 'zone.name',
      service: 'massage',
      pageTitle: 'Massage Valby',
      heading: 'Massage annoncer i Valby',
      firstPara:
        'Hos Myescort.dk finder du bedste erotiske massage i Odense og på Fyn. Vi har altid nye massage, escort og sex annoncer klar til dig. Brug søgefunktionen, hvis du søger andre former for escort eller massage.',
      secondPara: 'Hvis du vil bruge filter,',
      thirdPara:
        'Ønsker du at oprette en profil på Myescort.dk eller oprette en annonce,',
    },
    {
      spot: 'København',
      spotType: 'zone.name',
      service: 'escort',
      pageTitle: 'Escort København',
      heading: 'Søger du massage i København? Se massage annoncer her:',
      firstPara:
        'Er du på udkig efter massage annoncer i København? Her finder du listen over alle escort, massage, BDSM og trans annoncer i København. Hvis du søger efter massage annoncer i andre dele af Danmark,',
      secondPara: 'Hvis du vil bruge filter,',
      thirdPara:
        'Ønsker du at oprette en profil på Myescort.dk eller oprette en annonce,',
    },
    {
      spot: 'København',
      spotType: 'zone.name',
      service: 'massage',
      pageTitle: 'Massage København',
      heading: 'Massage annoncer i København',
      firstPara:
        'Hos Myescort.dk finder du bedste erotiske massage i Odense og på Fyn. Vi har altid nye massage, escort og sex annoncer klar til dig. Brug søgefunktionen, hvis du søger andre former for escort eller massage.',
      secondPara: 'Hvis du vil bruge filter,',
      thirdPara:
        'Ønsker du at oprette en profil på Myescort.dk eller oprette en annonce,',
    },
    {
      spot: 'Odense',
      spotType: 'area.name',
      service: 'escort',
      pageTitle: 'Escort Odense',
      heading: 'Nyeste escort, sex og massage annoncer i Odense og Fyn',
      firstPara:
        'Her finder du de nyeste escort, sex og massage annoncer i Odense og på Fyn på Myescort.dk. Escort i Odense er kendt for mange BDSM annoncer samt gode thaimassør. Du kan også finde annoncer fra mænd og private sex annoncer. Hvis du vil bruge filter,',
      secondPara: 'Ønsker du at oprette en annonce,',
      thirdPara: 'Se escort og andre annoncer i andre dele af Danmark',
    },
    {
      spot: 'Odense',
      spotType: 'area.name',
      service: 'massage',
      pageTitle: 'Massage Odense',
      heading: 'Find de bedste massage og escort annoncer i Odense',
      firstPara:
        'Hos Myescort.dk finder du bedste erotiske massage i Odense og på Fyn. Vi har altid nye massage, escort og sex annoncer klar til dig. Brug søgefunktionen, hvis du søger andre former for escort eller massage.',
      secondPara: 'Hvis du vil bruge filter,',
      thirdPara:
        'Ønsker du at oprette en profil på Myescort.dk eller oprette en annonce,',
    },
  ];
}

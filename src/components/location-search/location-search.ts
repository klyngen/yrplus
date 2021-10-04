import { html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators/custom-element";
import { queryAsync } from "lit/decorators/query-async";
import "@vaadin/vaadin-combo-box";
import { ComboBoxElement, ComboBoxItemModel } from "@vaadin/vaadin-combo-box";
import { httpClient } from "../../service/httpClient";
import { Location } from "../../service/interfaces";
import locationService from "../../service/location.service";
import style from "./location-search.styles.scss";
import { debounceTime, mergeMap, Subject } from "rxjs";

interface SearchParameters {
  page: number;
  pageSize: number;
  filter: string;
}

@customElement("location-search")
export class LocationSearch extends LitElement {
  callback: (res: any[], size: number) => void;
  dataLoadSubject: Subject<SearchParameters> = new Subject<SearchParameters>();

  @queryAsync("#location-combo")
  comboElement: Promise<ComboBoxElement>;


  dataFetch = (
    search: SearchParameters,
    callback: (res: any[], size: number) => void
  ) => {
    this.callback = callback;

    if (search.filter && search.filter.length > 0) {
      this.dataLoadSubject.next(search);
    }
  };

  static styles = [style];

  constructor() {
    super();
    this.comboElement.then((element) => {
      element.itemLabelPath = "skrivemåte";
      element.itemIdPath = "stedsnummer";
      element.renderer = (
        root: HTMLElement,
        _: ComboBoxElement,
        model: ComboBoxItemModel
      ) => {
        const location = model.item as Location;
        root.innerHTML = `
        <div class="location">
          <b>${location.skrivemåte}</b><br> 
          <p style="margin: 2px 0 2px 0" class="location-detail">${location.fylker[0].fylkesnavn}, ${location.kommuner[0].kommunenavn}</p>
        </div>`;
      };
    });

    this.dataLoadSubject
      .pipe(
        debounceTime(200),
        mergeMap((searchParams) =>
          httpClient.locationSearch(
            searchParams.filter,
            searchParams.pageSize,
            searchParams.page
          )
        )
      )
      .subscribe((data) => {
        if (this.callback) {
          this.callback(data.navn, data.navn.length);
        }
      });
  }

  render(): TemplateResult {
    return html`
      <p id="a"></p>
      <vaadin-combo-box
        @selected-item-changed="${this.valueChanged}"
        id="location-combo"
        placeholder="Skriv inn lokasjon..."
        .dataProvider="${this.dataFetch}"
      >
      </vaadin-combo-box>
    `;
  }

  valueChanged(event: CustomEvent) {
    const location = event.detail.value as Location;
    locationService.location = location;
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

import { html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators/custom-element";
import { state } from "lit/decorators/state";
import { WeatherData } from "../../service/httpClient";
import weatherService from "../../service/weather.service";
import style from "./weather-data.component.styles.scss";

@customElement("weather-data")
export class WeatherDataComponent extends LitElement {
  @state()
  data: WeatherData[] = [];

  constructor() {
    super();
    weatherService.observable.subscribe((data) => {
      this.data = data;
    });
  }

  static styles = [style];

  private renderWeatherData(item: WeatherData): TemplateResult {
    return html`
      <summary-component
        .day=${item.day.toString()}
        .summary=${item.summary}
        .icon=${item.snapshots[0]?.weather_icon}
      ></summary-component>
    `;
  }

  render(): TemplateResult {
    return html`
      <div class="weather-data">
        <div class="summaries">
          ${this.data.map((item) => this.renderWeatherData(item))}
        </div>
      </div>
    `;
  }
}

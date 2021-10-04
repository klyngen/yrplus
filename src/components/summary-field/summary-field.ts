import { html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators/custom-element";
import { property } from "lit/decorators/property";
import { DAY, WeatherSummary } from "../../service/httpClient";
import "../weather-icon/weather-icon";
import styles from "./summary-feild.styles.scss";

import dewPoint from "@carbon/icons/es/dew-point/16";
import humidity from "@carbon/icons/es/humidity/16";

@customElement("summary-component")
export class SummaryComponent extends LitElement {
  @property()
  summary: WeatherSummary;

  @property()
  icon: string = "cloud";

  @property()
  day: DAY = DAY.MONDAY;

  static styles = [styles];

  render(): TemplateResult {
    return html`
      <div class="summary-container">
        <div class="summary">
          <div class="wind-data">
            <p class="wind-strength">${this.summary.averageWindSpeed}m/s</p>
            <arrow-component
              size="20"
              color="white"
              .direction=${this.summary.averageWindDirection}
            ></arrow-component>
            <p class="wind-strength">${this.summary.averageGustSpeed}m/s</p>
          </div>
          <div class="air-quality">
            <div class="preassure">${this.summary.averagePreassure}hPa</div>
            <div class="humidity">
              <div>
                <p>${this.summary.averageHumidity}</p>
                <weather-icon .icon=${humidity}></weather-icon>
              </div>
              <div>
                <p>${this.summary.averageDewpoint}</p>
                <weather-icon .icon=${dewPoint}></weather-icon>
              </div>
            </div>
          </div>
          <div class="day">
            <weather-icon size="25" .name=${this.icon}></weather-icon>
            ${this.day}
            <div class="temperatures">
              <div class="temperature">
                <p>${this.summary.highestTemperature}°C</p>
                <p>${this.summary.lowestTemperature}°C</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

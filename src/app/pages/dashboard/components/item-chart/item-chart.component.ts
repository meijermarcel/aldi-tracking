import { Component, Input, ViewChild } from '@angular/core';
import { Item } from '../../../../store/state';
import { BaseChartDirective } from 'ng2-charts';
import moment from 'moment';
import { ChartConfiguration } from 'chart.js';

@Component({
    selector: 'item-chart',
    templateUrl: './item-chart.component.html',
    styleUrl: './item-chart.component.scss'
})
export class ItemChartComponent {
    @Input() item: Item | undefined;
    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

    chartData = {
        datasets: [],
        labels: []
    };

    chartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        hover: {
            mode: 'index',
            intersect: false
        },
        elements: {
            point: {
                radius: 0
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                displayColors: false,
                enabled: true
            }
        },
        scales: {
            x: {
                display: false
            }
        }
    };

    ngOnChanges() {
        this.createChart();
    }

    createChart() {
        this.chartData = {
            datasets: [],
            labels: []
        };

        if (this.item) {
            this.chartData.labels = this.item.storeItemPrices.map((price) =>
                moment(price.dateTime).format('MMMM Do, YYYY')
            );
            this.chartData.datasets.push({
                label: 'Price',
                data: this.item.storeItemPrices.map((price) => price.price),
                tension: 0.05
            });
        }
    }
}

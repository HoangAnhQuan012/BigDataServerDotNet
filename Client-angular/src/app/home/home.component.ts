import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { RankedPrescService } from '@shared/services/ranked-presc.service';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    ChartRankPresc: any;
    RankingDistributionOfPrescribers: number[] = [];
    basicOptions: any;

    chartYearOfExperience: any;
    YearsOfExpData: number[] = [];

    chartPrescribersToTotalPopulation: any;
    RatioOfPrescribersToTotalPopulation: number[] = [];


    constructor(
        private rankedPrescService: RankedPrescService) {
    }

    ngOnInit(): void {
        this.getAllData();
    }

    getAllData() {
        forkJoin(
            this.rankedPrescService.getRankingDistributionOfPrescribers(),
            this.rankedPrescService.getDistributionOfYearsOfExperience(),
            this.rankedPrescService.getPrescribersToTotalPopulation()
        ).subscribe(([rankedPresc, yearsOfExperience, prescribersToTotalPopulation]: any) => {
            this.RankingDistributionOfPrescribers = rankedPresc.result;
            this.YearsOfExpData = yearsOfExperience.result;
            this.RatioOfPrescribersToTotalPopulation = prescribersToTotalPopulation.result;

            this.ChartRankPresc = {
                labels: ['1', '2', '3', '4', '5'],
                datasets: [
                    {
                        label: 'Ranking Distribution of Prescribers',
                        data: this.RankingDistributionOfPrescribers,
                        backgroundColor: '#6E85B7',
                    }
                ]
            };

            this.chartYearOfExperience = {
                labels: ['20-30', '30-40', '40-50'],
                datasets: [
                    {
                        label: 'Distribution of years of experience',
                        data: this.YearsOfExpData,
                        backgroundColor: '#FFE194',
                    }
                ]
            };

            this.chartPrescribersToTotalPopulation = {
                labels: ['0 - 1.25%', '1.25 - 2.5%', '2.5 - 3.75', '> 3.75%'],
                datasets: [
                    {
                        label: 'Ratio of Prescribers to Total Population',
                        data: this.RatioOfPrescribersToTotalPopulation,
                        backgroundColor: '#42A5F5',
                    }
                ]
            };
        });
    }

    applyDarkTheme() {
        this.basicOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)'
                    }
                }
            }
        };
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Vehicle } from 'src/app/vehicle/shared/vehicle.model';
import { Subscription } from 'rxjs';
import { VehicleService } from 'src/app/vehicle/shared/vehicle.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit, OnDestroy {
  vehicles: Vehicle[];
  private subscription: Subscription;

  loading: Boolean = true;

  constructor(
    private vehicleService: VehicleService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.subscription = this.vehicleService.vehicleChanged.subscribe((vehicles: Vehicle[]) => {
      this.vehicles = vehicles;
      this.loading = false;
    });

    this.vehicleService.getVehiclesFromServer();

    this.vehicles = this.vehicleService.getVehicles();
  }

  onNewVehicle() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

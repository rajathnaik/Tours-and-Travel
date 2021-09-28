import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageService } from '../travelAway-services/package-service/package.service';
import { IPackageDetails } from '../travelAway-interfaces/packageDetails';


@Component({
  selector: 'app-view-package-details',
  templateUrl: './view-package-details.component.html',
  styleUrls: ['./view-package-details.component.css']
})
export class ViewPackageDetailsComponent implements OnInit {

  packageName: string;
  packageId: number;
  packageDetails: IPackageDetails[];
  errMsg: string;
  showMsg: boolean;
  packageDesc: string;

  constructor(private route: ActivatedRoute, private packageService: PackageService, private router: Router) { }

  ngOnInit(): void {

    this.packageId = parseInt(this.route.snapshot.params['packageId']);
    this.packageName = this.route.snapshot.params['packageName'];

    this.getPackageDetails();
  }

  getPackageDetails() {
    console.log(this.packageId);
    console.log(this.packageName)
    this.packageService.getPackageDetailsByPackId(this.packageId).subscribe(
      responsePackageData => {
        this.packageDetails = responsePackageData;
        console.log(responsePackageData);
        this.showMsg = false;
      },
      responsePackageError => {

        this.errMsg = responsePackageError;
        this.packageDetails = null;
        this.showMsg = true;
        alert("Something went wrong!");
      },
      () => console.log("getPackDetails exected successfully")
    )
  }
  bookPackage(pac: IPackageDetails) {
    this.router.navigate(['/bookpackage', pac.packageId]);
  }
}

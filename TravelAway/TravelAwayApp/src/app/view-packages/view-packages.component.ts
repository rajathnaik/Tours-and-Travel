import { Component, OnInit } from '@angular/core';
import { IPackage } from '../travelAway-interfaces/package';
import { ICategory } from '../travelAway-interfaces/Category';
import { IPackageCategory } from '../travelAway-interfaces/packagecategory';
import { Router } from '@angular/router';
import { PackageService } from '../travelAway-services/package-service/package.service';

@Component({
  selector: 'app-view-packages',
  templateUrl: './view-packages.component.html',
  styleUrls: ['./view-packages.component.css']
})
export class ViewPackagesComponent implements OnInit {

  packagesByCat: IPackageCategory[];
  packages: IPackage[];
  categories: ICategory[];
  filteredPackages: IPackage[];
  searchByPackageName: string;
  searchByCategoryId: string = "0";
  userRole: string;
  userName: string;
  showMsgDiv: boolean = false;
  errMsg: string;

  constructor(private packageService: PackageService, private router: Router) {
    this.userRole = sessionStorage.getItem('userRole');
    this.userName = sessionStorage.getItem('userName')
  }

  ngOnInit() {
    this.getPackages();
    this.getPackageCategories();
    //this.getSubPackages();
    if (this.packages == null) {
      this.showMsgDiv = true;
    }
    this.filteredPackages = this.packages;
  }
  getPackages() {
    var pack: IPackage;
    this.packageService.getAllPackages().subscribe(
      responseProductData => {
        this.packages = responseProductData;
        this.filteredPackages = responseProductData;
        this.showMsgDiv = false;

      },
      responseProductError => {
        this.packages = null;
        this.errMsg = responseProductError;
        console.log(this.errMsg);

      },
      () => console.log("getPackages executed succesfully")
    );
  }
  getPackageCategories() {
    this.packageService.getCategories().subscribe(
      responseCategoryData => {
        this.categories = responseCategoryData
        console.log(this.categories)
      },
      responseCategoryError => {
        this.categories = null;
        this.errMsg = responseCategoryError;
        console.log(this.errMsg);
      },
      () => console.log("GetProductCategoies method executed successfully")
    );
  }
  
  searchPackageByCategory(categoryId: string) {
    this.filteredPackages = this.packages;

    if (categoryId == "0") {
      this.filteredPackages = this.packages;
    }
    else {
      this.filteredPackages = this.filteredPackages.filter(pkg => pkg.packageCategoryId.toString() == categoryId);
    }
  }

  viewPackageDetails(pac: IPackage) {
    this.router.navigate(['/viewPackageDetails', pac.packageId, pac.packageName]);

  }
}



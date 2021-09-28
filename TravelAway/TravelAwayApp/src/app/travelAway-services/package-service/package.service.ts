import { Injectable } from '@angular/core';
import { IPackage } from '../../travelAway-interfaces/package';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICategory } from '../../travelAway-interfaces/category';
import { IPackageDetails } from '../../travelAway-interfaces/packageDetails';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  packages: IPackage[];
  categories: ICategory[];

  constructor(private http: HttpClient) { }

  getAllPackages(): Observable<IPackage[]> {
    let temp = this.http.get<IPackage[]>
      ('http://localhost:60200/api/User/GetPackages').pipe(catchError(this.errorHandler))
    return temp;
  }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>
      ('http://localhost:60200/api/User/GetPackageCategories').pipe(catchError(this.errorHandler));
  }
  getPackageDetailsByPackId(packageId: number): Observable<IPackageDetails[]> {
    return this.http.get<IPackageDetails[]>('http://localhost:60200/api/user/GetAllPackageDetailsByCategories?packageId=' + packageId).pipe(catchError(this.errorHandler));
  }


  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}


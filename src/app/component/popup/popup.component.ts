import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsModel } from 'src/app/component/table/entity/Product.model';
import { ProductService } from 'src/app/service/productservice/product.service';

import { PriceFormatPipe } from 'src/app/component/table/pipes/price-format.pipe';

import { MatSnackBar } from '@angular/material/snack-bar';

function numericValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  const isNumeric = /^\d+(\.\d+)?$/.test(value);
  return isNumeric ? null : { numeric: true }; // Return an error if the input is not numeric
}

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent {
  inputdata: any;
  editdata: any;
  products: any;

  constructor(
    //Handle dialog actions,passed data to parent component
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<PopupComponent>,
    private buildr: FormBuilder,
    private service: ProductService,
    private priceFormatPipe: PriceFormatPipe,
    private snackBar: MatSnackBar
  ) {
    this.editdata = [];
  }
  ngOnInit(): void {
    this.inputdata = this.data;
    if (this.inputdata.id > 0) {
      this.setpopupdata(this.inputdata.id);
    }
  }

  setpopupdata(id: any) {
    this.service.GetProductbycode(id).subscribe((item) => {
      this.editdata = item;
      this.myform.setValue({
        name: this.editdata.name,
        category: this.editdata.category,
        size: this.editdata.size,
        price: this.editdata.price,
        gender: this.editdata.gender,
        discount: this.editdata.discount,
        availability: this.editdata.availability,
      });
    });
  }
  closepopup() {
    this.ref.close();
  }
  myform = this.buildr.group({
    name: this.buildr.control('', Validators.required),
    category: this.buildr.control('', Validators.required),
    size: this.buildr.control('', Validators.required),
    price: this.buildr.control('', [Validators.required, numericValidator]),
    gender: this.buildr.control('', Validators.required),
    discount: this.buildr.control('', Validators.required),
    availability: this.buildr.control('', Validators.required),
  });

  Saveproduct(): void {
    if (this.myform.valid) {
      if (this.inputdata.id > 0) {
        // Update existing product
        const editedProduct: ProductsModel = {
          ...(this.myform.value as unknown as ProductsModel),
          id: this.inputdata.id,
          active: true,
        };
        this.service.editProduct(editedProduct).subscribe((res) => {
          this.closepopup();
        });
      } else {
        // Create new product

        const formattedPrice = this.priceFormatPipe.transform(
          this.myform.value.price
        );
        const newProduct: ProductsModel = {
          ...(this.myform.value as unknown as ProductsModel),
          price: parseFloat(formattedPrice),
          active: true,
        };

        this.service.Saveproduct(this.myform.value).subscribe((res) => {
          this.snackBar.open('Product saved successfully!', 'Close', {
            duration: 3000,
          });
          this.closepopup();
        });
      }
    }
    {
      this.closepopup();
    }
  }
}

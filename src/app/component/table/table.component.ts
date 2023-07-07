import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PopupComponent } from '../popup/popup.component';
import { ProductsModel } from 'src/app/component/table/entity/Product.model';
import { ProductService } from 'src/app/service/productservice/product.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  productlist!: ProductsModel[];
  dataSource: any;

  editingProductId: number | null = null;

  displayedColumns: string[] = [
    'name',
    'category',
    'size',
    'price',
    'gender',
    'discount',
    'availability',
    'action',
  ];

  @ViewChild(MatPaginator) paginatior!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private ProductService: ProductService,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<ProductsModel>([]);

    this.loadproduct();
  }

  ngOnInit(): void {}

  loadproduct() {
    this.ProductService.GetProduct().subscribe((res) => {
      this.productlist = res;
      this.dataSource = new MatTableDataSource<ProductsModel>(this.productlist);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
    });
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  addproduct() {
    this.Openpopup(0, 'Add Product', PopupComponent);
  }

  editproduct(id: any) {
    this.Openpopup(id, 'Edit Product', PopupComponent);
  }

  deleteProduct(productId: number): void {
    const index = this.productlist.findIndex(
      (product) => product.id === productId
    );

    if (index !== -1) {
      const confirmation = confirm(
        'Are you sure you want to delete this product?'
      );

      if (confirmation) {
        this.ProductService.ondelete(productId).subscribe(
          () => {
            // Product deleted successfully
            console.log('Product deleted:', productId);

            // Remove the deleted product from the productlist
            this.productlist = this.productlist.filter(
              (product) => product.id !== productId
            );

            // Update the dataSource with the updated productlist
            this.dataSource.data = this.productlist;
          },
          (error) => {
            // Error occurred during deletion
            console.error('Error deleting product:', error);
          }
        );
      }
    }
  }

  Openpopup(id: any, title: any, component: any) {
    var _popup = this.dialog.open(component, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        id: id,
      },
    });
    _popup.afterClosed().subscribe((item) => {
      console.log(item);
      this.loadproduct();
    });
  }
}

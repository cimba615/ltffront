import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CacheService } from "../../../services/cache.service";

@Component({
  selector: "ltf-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.sass"],
})
export class HeaderComponent implements OnInit {
  searchForm: FormGroup;

  @Input() isLoggedIn: Boolean;

  constructor(private cache: CacheService) {
    this.searchForm = new FormGroup({
      query: new FormControl(""),
    });
  }

  ngOnInit() {
    this.searchForm.valueChanges.subscribe((data) => {
      this.cache.updateSearchQuery(data.query);
    });
  }
  onSearchKeydown(event) {
    if (event.key === "Enter") {
      const id = "productslisting";
      console.log(`scrolling to ${id}`);
      const el = document.getElementById(id);
      el.scrollIntoView();
    }
  }
  goToPorducts() {
    const id = "productslisting";
    console.log(`scrolling to ${id}`);
    const el = document.getElementById(id);
    el.scrollIntoView();
  }
}

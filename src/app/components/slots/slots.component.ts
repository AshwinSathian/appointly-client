import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SlotService } from 'src/app/services/slot.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.css']
})
export class SlotsComponent implements OnInit {

  allSlots: Array<number>;
  activeSlots: Array<number>;

  constructor(
    private route: ActivatedRoute,
    private slotService: SlotService,
    private sharedService: SharedService
  ) {
    this.allSlots = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
      13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
    ];
  }

  ngOnInit(): void {
    if (this.route.snapshot.data.slots.activeSlots) {
      this.activeSlots = this.route.snapshot.data.slots.activeSlots;
    } else {
      this.activeSlots = [];
    }
  }

  isActiveSlot(slot: number): boolean {
    return this.activeSlots.includes(slot) ? true : false;
  }

  toggleSlotState(slot: number): void {
    if (this.isActiveSlot(slot)) {
      const index = this.activeSlots.indexOf(slot);
      this.activeSlots.splice(index, 1);
    } else {
      this.activeSlots.push(slot);
    }
  }

  updateSlots(): void {
    this.sharedService.startLoader('UPdating Slots');
    this.slotService.updateSlots(this.activeSlots)
    .subscribe(response => {
      this.sharedService.stopLoader();
    });
    console.log(this.activeSlots);
  }
}

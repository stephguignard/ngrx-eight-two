import { Component, OnInit, OnDestroy } from "@angular/core";

import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";

import { Store, select } from "@ngrx/store";
import * as ToDoActions from "../todo.actions";
import ToDo from "../todo.model";
import ToDoState from "../todo.state";

@Component({
  selector: "app-to-do",
  templateUrl: "./to-do.component.html",
  styleUrls: ["./to-do.component.scss"]
})
export class ToDoComponent implements OnInit, OnDestroy {
  todo$: Observable<ToDoState>;
  ToDoSubscription: Subscription;

  ToDoList: ToDo[];

  title = "";
  isCompleted = false;

  todoError: Error;

  constructor(private store: Store<{ todos: ToDoState }>) {
    this.todo$ = store.pipe(select("todos"));
  }

  ngOnInit() {
    this.ToDoSubscription = this.todo$
      .pipe(
        map(x => {
          this.ToDoList = x.ToDos;
          this.todoError = x.ToDoError;
        })
      )
      .subscribe();
    this.store.dispatch(ToDoActions.BeginGetToDoAction());
  }

  createToDo() {
    const todo: ToDo = { title: this.title, isCompleted: this.isCompleted };
    this.store.dispatch(ToDoActions.BeginCreateToDoAction({ payload: todo }));
    this.title = "";
    this.isCompleted = false;
  }

  ngOnDestroy() {
    this.ToDoSubscription.unsubscribe();
  }
}

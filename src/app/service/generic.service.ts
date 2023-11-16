import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T, ID> {

  constructor(
    protected htttp: HttpClient,
    @Inject("url") protected url: string,
  ) {}

  findAll(){
    return this.htttp.get<T[]>(this.url);
  }

  findById(id: ID){
    return this.htttp.get<T>(`${this.url}/${id}`);
  }

  save(t: T){
    return this.htttp.post(this.url, t);
  }

  update(id: ID, t: T){
    return this.htttp.put(`${this.url}/${id}`, t);
  }

  delete(id: ID){
    return this.htttp.delete(`${this.url}/${id}`);
  }

}

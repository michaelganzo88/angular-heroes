import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {

    private heroesUrl = 'api/heroes';
    private haeders = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
                    .toPromise()
                    .then(response => response.json().data as Hero[])
                    .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    getHero(id: number): Promise<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http
            .get(url)
            .toPromise()
            .then(response => response.json().data as Hero)
            .catch(this.handleError);
    }

    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.haeders})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    create(name: string): Promise<Hero> {
        const url = `${this.heroesUrl}`;
        return this.http
            .post(url, JSON.stringify({name: name}), {headers: this.haeders})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http
            .delete(url, {headers: this.haeders})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise<Hero[]>(
            resolve => setTimeout(resolve, 2000)
        ).then(() => this.getHeroes());
    }

    /*getHero(id: number): Promise<Hero> {
        return this.getHeroes().then(
            heroes => heroes.find(hero => hero.id === id)
        );
    }*/
    
    /*getHeroes(): Promise<Hero[]> {
        return Promise.resolve(HEROES);
    }*/

    
}
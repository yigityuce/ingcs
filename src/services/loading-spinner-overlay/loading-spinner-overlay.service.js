import {BehaviorSubject} from 'rxjs';

class LoadingSpinnerOverlayService {
  _counter = new BehaviorSubject(0);

  getSubject = () => {
    return this._counter;
  };

  /**
   * @param {(...args: any) => any} cb
   */
  increment(cb) {
    this._counter.next(this._counter.value + 1);
    return cb?.();
  }

  /**
   * @param {(...args: any) => any} cb
   */
  decrement(cb) {
    this._counter.next(this._counter.value - 1);
    return cb?.();
  }

  /**
   * @param {(...args: any) => any} cb
   */
  reset(cb) {
    this._counter.next(0);
    return cb?.();
  }
}

export const loadingSpinnerOverlayService = new LoadingSpinnerOverlayService();

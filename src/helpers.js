export const eq       = x => y => x === y;
export const neq      = x => y => x !== y;
export const ident    = x => x;
export const konst    = x => () => x;
export const T        = konst(true);
export const F        = konst(false);
export const flip     = f => (x,y) => f(y,x);
export const mapObj   = (o,f) => Object.keys(o).reduce((ro, k) => { ro[k] = f(o[k]); return ro; }, {});
export const guard    = (p,f, def) => x => p(x) ? f(x) : def;
export const bind     = (fn, ...bargs) => (...args) => fn(...bargs, ...args);
export const pipe     = (...fs) => x => fs.reduce((p, cf) => cf(p), x);


export const byProp   = prop => val => obj => obj[prop] == val;
export const byId     = byProp('id');
export function find(arr, finder) {
  for (var i = 0, len = arr.length; i < len; i++) {
    const it = arr[i];
    if(finder(it))
      return it;
  }
}

export function path(path, finder=byId) {
  const parts = Array.isArray(path) ? path : path.slice(1).split('/');
  return obj => {
    var res = obj;
    for (let i = 0; i < parts.length; i++) {
      var prop = parts[i];
      if(Array.isArray(res))
        res = find(res, finder(prop));
      else if(res && prop in res)
        res = res[prop];
      else
        return undefined;
    }
    return res;
  }
}

export const contract = model => ({reducer: reducerOf(model), actions: actionsOf(model)});

export function actionsOf(model, except=['init']) {
  const actions = {};
  for (let type in model) {
      if(except.indexOf(type) < 0)
        actions[type] = (...args) => ({type, args});
  }
  return actions;
}

export function reducerOf(model) {
  return (state, {type, args}) => {
    if(state === undefined)
      return model.init();

    const handler = model[type];
    if(handler)
      return handler(state, ...args);
    else
      return state;
  }
}

export function wrapAction(ctx, ...args) {
  return action => ctx(...args, action);
}

export function wrapThunk(ctx, getter, ...args) {
  return thunk =>
          (dispatch, getState) =>
            thunk(action => dispatch(ctx(...args, action)), pipe(getState, getter));
}

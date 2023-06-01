export function Controller(prefix: string = '') {
  return function (target: any) {
    target.prototype.controllerPrefix = prefix;
  };
};

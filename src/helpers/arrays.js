// sort array by key
export function sort(array, key, direction = 'asc') {
    const _direction = direction.toLowerCase() === 'asc' ? 1 : -1;
  
    return [...array].sort((a, b) => {
      const _a = a[key].toUpperCase();
      const _b = b[key].toUpperCase();
      let comparison = 0;
      if (_a > _b) {
        comparison = 1;
      } else if (_a < _b) {
        comparison = -1;
      }
  
      return comparison & _direction;
    });
  }
  
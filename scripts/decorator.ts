export const once = <T>(
  target: Object,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<T>,
) => {
  let hasBeenCalled = false

  return {
    get() {
      if (hasBeenCalled) {
        return () => {}
      }
      hasBeenCalled = true
      return (descriptor.value as Function).bind(this)
    },
  }
}

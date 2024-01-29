async function createOrchid(event) {
  event.preventDefault()
  try {
    await fetch('/orchids', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: event.target.name.value,
        image: event.target.image.value,
        price: event.target.price.value,
        original: event.target.original.value,
        isNatural: event.target.natural.checked,
        color: event.target.color.value
      })
    })
  } catch (err) {
    console.error(err)
  }
  window.location.reload()
}

async function updateOrchid(event) {
  event.preventDefault()
  try {
    await fetch(`/orchids/${event.target.slug.value}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: event.target.name.value,
        image: event.target.image.value,
        price: event.target.price.value,
        original: event.target.original.value,
        isNatural: event.target.natural.checked,
        color: event.target.color.value
      })
    })
  } catch (err) {
    console.error(err)
  }
  window.location.reload()
}

const deleteOrchid = async (slug) => {
  try {
    await fetch(`/orchids/${slug}`, {
      method: 'DELETE'
    })
  } catch (err) {
    console.error(err)
  }
  window.location.reload()
}

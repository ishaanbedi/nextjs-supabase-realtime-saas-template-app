const TagDiv = () => {
  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <header className="text-center">
          <h2 className="text-xl font-bold text-primary sm:text-3xl">
            Analytics at your fingertips, in real-time!
          </h2>

          <p className="max-w-md mx-auto mt-4 text-secondary-foreground">
            With our SaaS app, you can get analytics on your data in real-time, with no extra effort.
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
          <li>
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80"
              alt=""
              className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
            />

          </li>

          <li>
            <img
              src="https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
              alt=""
              className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
            />

          </li>

          <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <img
              src="https://images.unsplash.com/photo-1542744173-05336fcc7ad4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2902&q=80"
              alt=""
              className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
            />

          </li>
        </ul>
      </div>
    </section>
  );
}

export default TagDiv;
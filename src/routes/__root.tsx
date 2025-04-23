import { createRootRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Spinner } from "../components/Spinner";
import SplitLayout from "@/components/FlexLayout";

function RouterSpinner() {
  const isLoading = useRouterState({ select: (s) => s.status === 'pending' });
  return <Spinner show={isLoading} />;
}

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <div className="min-h-screen flex flex-col">
          <div className="flex items-center border-b gap-2">
            <h1 className="text-3xl p-2">Grela</h1>
            <RouterSpinner />
          </div>
          <SplitLayout
            left={
              <div className="divide-y w-56">
                {[
                  ['/', 'Home'],
                  ['/about', 'About'],
                  ['/pomodoro', 'Pomodoro'],
                ].map(([to, label]) => (
                  <div key={to}>
                    <Link
                      to={to}
                      preload="intent"
                      className="block py-2 px-3 text-blue-700"
                      activeProps={{ className: 'font-bold' }}
                    >
                      {label}
                    </Link>
                  </div>
                ))}
              </div>
            }
            right={<Outlet />}
          />
        </div>
        <TanStackRouterDevtools position="bottom-right" />
      </>
    );
  },
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on root route</p>
        <Link to="/">Start Over</Link>
      </div>
    )
  },
})
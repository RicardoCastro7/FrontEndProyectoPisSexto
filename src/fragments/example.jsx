import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="bg-white">
      <header className="bg-gray-200 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Radiación UV</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link className="text-blue-600 hover:text-blue-800" href="#">
                  Perfil
                </Link>
              </li>
              <li>
                <Link className="text-blue-600 hover:text-blue-800" href="#">
                  Cerrar Sesión
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-6">API de Radiación Ultravioleta</h2>
        <p className="mb-4">Ejecuta las peticiones, en consola o desde cualquier sitio:</p>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">PETICIONES POST</h3>
            <div className="border p-4 rounded space-y-4">
              <div className="flex gap-2 items-center">
                <label className="flex-grow" htmlFor="fecha-inicio">
                  Fecha de inicio
                </label>
                <Input className="flex-grow" id="fecha-inicio" type="date" />
              </div>
              <div className="flex gap-2 items-center">
                <label className="flex-grow" htmlFor="fecha-fin">
                  Fecha de fin
                </label>
                <Input className="flex-grow" id="fecha-fin" type="date" />
              </div>
              <Button className="w-full" variant="secondary">
                Medición por fechas
              </Button>
              <Button className="w-full" variant="secondary">
                Medición por semana
              </Button>
              <Button className="w-full" variant="secondary">
                Medición por día
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">PETICIONES GET</h3>
            <div className="border p-4 rounded space-y-4">
              <Button className="w-full" variant="secondary">
                Medición promedio
              </Button>
              <Button className="w-full" variant="secondary">
                Medición por dispositivos
              </Button>
              <Button className="w-full" variant="secondary">
                Activos
              </Button>
              <Button className="w-full" variant="secondary">
                Listar dispositivos
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
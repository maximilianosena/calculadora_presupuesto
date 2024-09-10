document.addEventListener("DOMContentLoaded", () => {

    let input_largo = document.getElementById("alto")
    let input_ancho = document.getElementById("ancho")
    let cuadrado = 0
    let resultado = document.getElementById("resultado")
    let precio = document.getElementById("precio")
    let grupo_cuadrados = []
    let cotizacion = document.getElementById("cotizacion")
    let total = 0
    let valorFinal = 0
    let view_resultados = document.getElementById("view_resultados")


    const saveItems = {user:localStorage.getItem("user"),
     token:localStorage.getItem("token")}

    localStorage.clear()


    async function precios() {
        let takeToken=localStorage.setItem("token", saveItems.token);
        let token= localStorage.getItem("token")
        try {
        const response = await fetch('http://localhost:5500/info', {
                method: 'GET',
                headers: {
                'Authorization': `Bearer ${token}`
                    }
                        })

            if (!response.ok) {
                throw new Error("Error al cargar")
            }

            const data = await response.json()
            
            return data

        } catch (error) {
            console.log("ERROR: ", error)
        }
    }

    precios().then(data => {

        console.log(data)
        localStorage.setItem("token", saveItems.token);
        localStorage.setItem("user", saveItems.user);

        function area() {
            let largo = parseFloat(input_largo.value)
            let ancho = parseFloat(input_ancho.value)

            if (Number.isNaN(largo) || Number.isNaN(ancho)) {
                alert("Ingrese valores numéricos en los 3 campos")
                location.reload()
            }else if (ancho<=0 || largo<=0 || precio.value <=0){
                alert("Ingrese valores numéricos mayores a 0")
                location.reload()
            } else {
                cuadrado = largo * ancho
                grupo_cuadrados.push(cuadrado)
                console.log(grupo_cuadrados)
                resultado.innerHTML = `<figure>
    <blockquote class="blockquote">
    El área de este fragmento es de ${parseFloat(cuadrado).toFixed(2)} metros cuadrados 
          </blockquote> 
                             <figcaption class="blockquote-footer">
                            <p>Si desea ingresar otro segmento de material o área de zócalo, 
                            ingreselo y de Enter nuevamente </p> 
                            <p>En caso contrario, continúe haciendo click en el botón de abajo <p>
                              </figcaption>
                            </figure>
                            

                            <button id="finalizar" type="button" class="btn btn-info"> Finalizar suma de M2</button>
    `
            }
            document.getElementById("finalizar").addEventListener("click", finalizar);
        }


        let boton = document.getElementById("boton")

        boton.addEventListener("click", () => {
            area()
            input_largo.value = ""
            input_ancho.value = ""
        })

        function finalizar() {

            for (let item of grupo_cuadrados) {
                console.log("Suma metros " + item)
                total += item
            }
            console.log(precio.value)
            localStorage.setItem("Precio m2", precio.value)
            valorFinal = total * parseFloat(precio.value)
            localStorage.setItem("Área total", total)
            cotizacion.innerHTML = `
    <blockquote class="blockquote">
    La cotización es de U$D ${valorFinal.toFixed(2)} para ${total.toFixed(2)} m2 totales <br>
     </blockquote>
                             <button id="borrar" class="btn btn-danger">Borrar</button>
                             <fieldset>
    <legend><h3>Terminaciones</h3></legend>
    
    <h4>Huecos</h4>
    <input type="checkbox" name="Hueco y pegado de pileta" id="hypp"> Hueco y pegado de pileta <span id="hyppSpan"> </span>
    <br>
    <input type="checkbox" name="Hueco para anafe" id="hpa"> Hueco para anafe  <span id="hpaSpan"> </span>
    <br>
    <input type="checkbox" name="Hueco de grifería" id="hdg"> Hueco de grifería <span id="hdgSpan"> </span>
    <br>
    <input type="checkbox" name="Hueco para bacha de apoyo" id="hpbda"> Hueco para bacha de apoyo <span id="hpbdaSpan"> </span>
    <br>
    <input type="checkbox" name="Cajas de Luz" id="cajaLuz"> Cajas de luz <span id="cajaLuzSpan"> </span>
    <h4>Bordes</h4>
     <figcaption class="blockquote-footer">
                            <p>Puede ingresar mas de un perimetro sumandolo: valor1 + valor2</p> 
                              </figcaption>
    <input type="checkbox" name="Borde pulido simple" id="pulidoSimple"> Pulido simple <span id="pulidoSimpleSpan"> </span>
    <br>
    <input type="checkbox" name="Borde pulido con bisel" id="pulidoBisel"> Pulido con bisel <span id="pulidoBiselSpan"> </span>
    <br>
    <input type="checkbox" name="Medio bastón" id="medioBaston"> Medio bastón <span id="medioBastonSpan"> </span>
    <br> 
    <input type="checkbox" name="Doble bastón" id="dobleBaston"> Doble bastón <span id="dobleBastonSpan"> </span>
    <br>
    <input type="checkbox" name="Medio bastón con tira pegada" id="medioBastontiraPegada"> Medio bastón con tira pegada <span id="medioBastontiraPegadaSpan"> </span>
    <br>
    <input type="checkbox" name="Tira pegada (doble, 4cm)" id="tiraPegada"> Tira pegada (doble, 4cm)  <span id="tiraPegadaSpan"> </span>
    <br>
    <input type="checkbox" name="Tira antiderrame" id="tiraAnti"> Tira antiderrame <span id="tiraAntiSpan"> </span>
    <br>
    <input type="checkbox" name="Ingleteado 45°" id="ingle45"> Ingleteado 45° <span id="ingle45Span"> </span>
    <br>
    <input type="checkbox" name="Ingleteado 90°" id="ingle90"> Ingleteado 90° <span id="ingle90Span"> </span>
    <br>
    <input type="checkbox" name="Pulido duchero doble" id="pulidoDD"> Pulido duchero doble <span id="pulidoDDSpan"> </span>
    <br>
    <input type="checkbox" name="Pulido duchero simple" id="pulidoDS"> Pulido duchero simple <span id="pulidoDSSpan"> </span>
    <br>
    <h4>Otros</h4>
    <input type="checkbox" name="Thiner" id="thiner"> Thiner <span id="thinerSpan"> </span>
    <br>
    <input type="checkbox" name="Silicona" id="silicona"> Silicona <span id="siliconaSpan"> </span>
    <br>
        </fieldset>
        <br> 
                            <button id="finalizarCuenta" type="button" class="btn btn-success"> Finalizar Selección</button>
    `

            let hypp = document.getElementById("hypp")

            hypp.addEventListener("click", () => {
                sumaRestaHuecos(hypp);
            });

            let hpa = document.getElementById("hpa")


            hpa.addEventListener("click", () => {
                sumaRestaHuecos(hpa);
            });
            let hdg = document.getElementById("hdg")


            hdg.addEventListener("click", () => {
                sumaRestaHuecos(hdg);
            });

            let hpbda = document.getElementById("hpbda")


            hpbda.addEventListener("click", () => {
                sumaRestaHuecos(hpbda);
            });

            let cajaLuz = document.getElementById("cajaLuz")


            cajaLuz.addEventListener("click", () => {
                sumaRestaHuecos(cajaLuz);
            });


            let pulidoSimple = document.getElementById("pulidoSimple")

            pulidoSimple.addEventListener("click", () => {
                sumaRestaPulidos(pulidoSimple);
            })

            let pulidoBisel = document.getElementById("pulidoBisel")

            pulidoBisel.addEventListener("click", () => {
                sumaRestaPulidos(pulidoBisel)
            });

            let medioBaston = document.getElementById("medioBaston")

            medioBaston.addEventListener("click", () => {
                sumaRestaPulidos(medioBaston)
            })

            let dobleBaston = document.getElementById("dobleBaston")

            dobleBaston.addEventListener("click", () => {
                sumaRestaPulidos(dobleBaston)
            })

            let medioBastontiraPegada = document.getElementById("medioBastontiraPegada")

            medioBastontiraPegada.addEventListener("click", () => {
                sumaRestaPulidos(medioBastontiraPegada)
            })


            let tiraPegada = document.getElementById("tiraPegada")

            tiraPegada.addEventListener("click", () => {
                sumaRestaPulidos(tiraPegada)
            })

            let tiraAnti = document.getElementById("tiraAnti")

            tiraAnti.addEventListener("click", () => {
                sumaRestaPulidosDistintos(tiraAnti)
            })


            let ingle45 = document.getElementById("ingle45")

            ingle45.addEventListener("click", () => {
                sumaRestaPulidosDistintos(ingle45)
            })


            let ingle90 = document.getElementById("ingle90")

            ingle90.addEventListener("click", () => {
                sumaRestaPulidosDistintos(ingle90)
            })

            let pulidoDD = document.getElementById("pulidoDD")

            pulidoDD.addEventListener("click", () => {
                sumaRestaPulidos(pulidoDD)
            })

            let pulidoDS = document.getElementById("pulidoDS")

            pulidoDS.addEventListener("click", () => {
                sumaRestaPulidos(pulidoDS)
            })

            let thiner = document.getElementById("thiner")

            thiner.addEventListener("click", () => {
                sumaRestaOtros(thiner)
            })


            let silicona = document.getElementById("silicona")

            silicona.addEventListener("click", () => {
                sumaRestaOtros(silicona)
            })


            document.getElementById("borrar").addEventListener("click", borrar)

            let parteFinal = document.getElementById("finalizarCuenta")
            let parrafoFinal = document.getElementById("final")

            parteFinal.addEventListener("click", () => {
                parrafoFinal.innerHTML = `<input type="checkbox" name="esDekton" id="esDekton"> Es Dekton o Porcelánico? <br>
                                <button class="finalizarPresupuesto btn btn-success" id="f1"> Finalizar Presupuesto </button>`

                document.getElementById("f1").addEventListener("click", () => {
                    visualizador_final()
                    location.href="#top"
                })

                let isDekton = document.getElementById("esDekton")
                isDekton.addEventListener("change", () => {
                    if (isDekton.checked) {

                        localStorage.setItem("Dekton/Porcelánico", "Verdadero")
                        parrafoFinal.innerHTML = `<input type="checkbox" name="no_esDekton" id="no_esDekton"> Revertir elección <br>
                                                                    <button class="finalizarPresupuesto btn btn-success" id="f2"> Finalizar Presupuesto </button>`
                        document.getElementById("f2").addEventListener("click", () => {
                            visualizador_final()
                            location.href="#top"
                        })

                        let noIsDekton = document.getElementById("no_esDekton")
                        noIsDekton.addEventListener("click", () => {

                            console.log("No es Dekton")
                            parrafoFinal.innerHTML = `<button class="finalizarPresupuesto btn btn-success" id="f3"> Finalizar Presupuesto </button>`
                            document.getElementById("f3").addEventListener("click", () => {
                                visualizador_final()
                                location.href="#top"
                            })
                            if (localStorage.getItem("Dekton/Porcelánico")) {
                                if (hypp.checked) valorFinal -= 10;
                                if (hpa.checked) valorFinal -= 10;
                                if (hpbda.checked) valorFinal -= 5;
                                if (hdg.checked) valorFinal -= 5;
                                if (cajaLuz.checked) valorFinal -= 4;
                                if (ingle45.checked) restaIngleteados_Dekton()
                                if (ingle90.checked) restaIngleteados_Dekton()
                            }
                            actualizarValorFinal()
                            localStorage.removeItem("Dekton/Porcelánico")
                        })
                        if (isDekton.checked) {
                            if (hypp.checked) valorFinal += 10;
                            if (hpa.checked) valorFinal += 10;
                            if (hpbda.checked) valorFinal += 5;
                            if (hdg.checked) valorFinal += 5;
                            if (cajaLuz.checked) valorFinal += 4;
                            if (ingle45.checked) sumaIngleteados_Dekton()
                            if (ingle90.checked) sumaIngleteados_Dekton()
                        }
                        actualizarValorFinal()
                    }
                })
            })


        }



        let totalPulidos = 0;
        let registrosPulidos = {};

        let totalHuecos = 0;
        let registroHuecos = {};

        let totalOtros = 0;
        let registrosOtros = {};

        function sumarHuecos(numero, precio, isChecked, idCheckbox) {
            numero = parseFloat(numero) || 0;
            let totalidadHuecos = numero * precio;

            if (isChecked) {
                if (registroHuecos[idCheckbox] !== undefined) {
                    // Restar el valor anterior si ya está registrado
                    totalHuecos -= registroHuecos[idCheckbox];
                    console.log(registroHuecos)
                }
                // Registrar el nuevo valor
                registroHuecos[idCheckbox] = totalidadHuecos;
                totalHuecos += totalidadHuecos;
            } else {
                // Si el checkbox está desmarcado, restar el valor registrado
                if (registroHuecos[idCheckbox] !== undefined) {
                    totalHuecos -= registroHuecos[idCheckbox];
                    delete registroHuecos[idCheckbox];
                }
            }

            actualizarValorFinal();
        }

        function sumaRestaPulidos(tipo) {
            console.log(tipo)
            const tipoSpan = document.getElementById(`${tipo.id}Span`);
            const name = tipo.name
            let i = data.bordes.findIndex(elemento => elemento.nombre == name)


            console.log(i)
            const tipoNumeroInput = document.getElementById(`${tipo.id}Numero`);

            if (tipo.checked) {
                tipoSpan.innerHTML = `
                <br>
                <label for="${tipo.id}Numero">Cuántos metros lineales se harán?:</label>
                <input type="text" id="${tipo.id}Numero">
            `;

                // Actualiza el input después de añadir el HTML
                const nuevoTipoNumeroInput = document.getElementById(`${tipo.id}Numero`);
                nuevoTipoNumeroInput.addEventListener("input", () => {
                    const valorInput = nuevoTipoNumeroInput.value.trim();

                    if (valorInput === "" || valorInput === "0") {
                        if (registrosPulidos[tipo.id] !== undefined) {
                            totalPulidos -= registrosPulidos[tipo.id];
                            delete registrosPulidos[tipo.id];
                            console.log(registrosPulidos);
                        }
                    } else {
                        sumarPulidos(valorInput, data.bordes[i].precio, tipo.checked, tipo.id);
                        localStorage.setItem(tipo.name, valorInput)
                        console.log(registrosPulidos);
                    }

                    actualizarValorFinal();
                });

            } else {
                if (tipoNumeroInput) {
                    const valorInput = tipoNumeroInput.value.trim();
                    if (valorInput !== "" && valorInput !== "0") {
                        sumarPulidos(valorInput, data.bordes[i].precio, tipo.checked, tipo.id);
                    }
                }
                localStorage.removeItem(tipo.name)
                tipoSpan.innerHTML = `<span></span>`;
            }
        }

        function sumaRestaPulidosDistintos(tipo) {
            console.log(tipo)
            const tipoSpan = document.getElementById(`${tipo.id}Span`);
            const name = tipo.name
            let i = data.bordes.findIndex(elemento => elemento.nombre == name)

            console.log(i)

            if (tipo.checked) {
                tipoSpan.innerHTML = `
                    <br>
                    <label for="${tipo.id}Numero">Cuántos metros lineales se harán?:</label>
                    <input type="text" id="${tipo.id}Numero"> <br>
                    <label for="${tipo.id}Area">Área de la tira:</label>
                    <figcaption class="blockquote-footer">
                            <p>Para ingresar más de una área escribir en orden correlativo sus lados</p> 
                            <p>Ejemplo: Área 1(2m largo x 5m ancho) Área 2 (3m largo x 6m ancho)<p>
                            <p>Escribir: Largo 2+3 | Ancho 5+6<p>
                              </figcaption>
                    Largo: <input type="text" name="area1" id="${tipo.id}largo"> <br>
                    Ancho: <input type="text" name="area1" id="${tipo.id}alto"> <hr>
                    <button class="btn btn-secondary" id="${tipo.id}button"> Enviar </button>
                `;


                const tipoNumeroInput = document.getElementById(`${tipo.id}Numero`);
                const largoTerminación = document.getElementById(`${tipo.id}largo`);
                const altoTerminación = document.getElementById(`${tipo.id}alto`);
                const buttonCalculo = document.getElementById(`${tipo.id}button`);

                console.log(tipoNumeroInput)

                function recalcularArea() {
                    let valorLargo = largoTerminación.value.trim() || 0;
                    let valorAlto = altoTerminación.value.trim() || 0;
                    if (typeof valorLargo === 'string' && valorLargo.includes("+")|| typeof valorAlto === 'string' && valorAlto.includes("+")){
                        let grupoLargos = valorLargo.split("+")
                        let grupoAltos = valorAlto.split("+")
                        let area = 0
                     for (let i=0; i < grupoAltos.length; i++){
                        let fragmento_area = grupoLargos[i] * grupoAltos[i]
                        area += fragmento_area
                        console.log("AREA " + area)
                     } 
                     let precioArea = area * precio.value
                        console.log(precioArea)
                        localStorage.setItem(`Precio area ${name}`, precioArea)
                        localStorage.setItem(`Area de la tira ${name}`, area)
                        totalPulidos += precioArea;
                        actualizarValorFinal()
                    } else 
                    if (valorLargo > 0 && valorAlto > 0) {
                        let area = (valorAlto * valorLargo);
                        console.log("AREA " + area)
                        console.log("PRECIO METRO CUADRADO:" + precio.value)
                        let precioArea = area * precio.value
                        console.log(precioArea)
                        localStorage.setItem(`Precio area ${name}`, precioArea)
                        localStorage.setItem(`Area de la tira ${name}`, area)
                        totalPulidos += precioArea;
                        actualizarValorFinal();
                    } else {
                        alert("Añada valores válidos")
                        alert("De click nuevamente en la opción")
                    }
                }

                buttonCalculo.addEventListener("click", () => {
                    let valorInput = tipoNumeroInput.value
                    if (valorInput === 0) {
                        if (registrosPulidos[tipo.id] !== undefined) {
                            totalPulidos -= registrosPulidos[tipo.id];
                            delete registrosPulidos[tipo.id];
                            console.log(registrosPulidos);
                        }
                        actualizarValorFinal();
                    } else {
                        sumarPulidos(valorInput, data.bordes[i].precio, tipo.checked, tipo.id);
                        recalcularArea();
                        console.log(tipoNumeroInput.id)
                        localStorage.setItem(tipo.name, valorInput)
                        localStorage.setItem("metrosIngleteado", valorInput)
                        altoTerminación.addEventListener("input", recalcularArea);
                        largoTerminación.addEventListener("input", recalcularArea)
                        console.log(registrosPulidos);
                    }
                    tipoNumeroInput.classList.add("disabled")
                    altoTerminación.classList.add("disabled")
                    largoTerminación.classList.add("disabled")
                });



            } else {
                const tipoNumeroInput = document.getElementById(`${tipo.id}Numero`);
                const largoTerminación = document.getElementById(`${tipo.id}largo`);
                const altoTerminación = document.getElementById(`${tipo.id}alto`);

                
                if (largoTerminación) largoTerminación.value = "";
                if (altoTerminación) altoTerminación.value = "";

                let storageArea = parseFloat(localStorage.getItem(`Precio area ${name}`)) || 0;
                console.log("Este es el PRECIO AREA:", storageArea)
                totalPulidos -= storageArea

                localStorage.removeItem(tipo.name)
                localStorage.removeItem(`Precio area ${name}`)
                localStorage.removeItem(`Area de la tira ${name}`)
                localStorage.removeItem("metrosIngleteado")
                tipoSpan.innerHTML = `<span></span>`;

                if (tipoNumeroInput) {
                    const valorInput = parseFloat(tipoNumeroInput.value.trim()) || 0;
                    if (valorInput !== 0) {
                        sumarPulidos(valorInput, data.bordes[i].precio, tipo.checked, tipo.id);
                    }
                }

                actualizarValorFinal();
            }
        }

        function restaIngleteados_Dekton() {
          
            
            let storageIngleteado45 =  localStorage.getItem(`Ingleteado 45°`)?parseFloat(localStorage.getItem(`Ingleteado 45°`)) : 0
            let storageIngleteado90 =  localStorage.getItem(`Ingleteado 90°`)?parseFloat(localStorage.getItem(`Ingleteado 90°`)) : 0
            
            if (storageIngleteado45) {
            valorFinal -= (storageIngleteado45*5)
            } else if (storageIngleteado90){
            valorFinal -= (storageIngleteado90*5)
            } else {
                console.log("No se encontró inglete para restar")
            }
        }

        
        function sumaIngleteados_Dekton() {
           
          
            let storageIngleteado45 =  localStorage.getItem(`Ingleteado 45°`)?parseFloat(localStorage.getItem(`Ingleteado 45°`)) : 0
            let storageIngleteado90 =  localStorage.getItem(`Ingleteado 90°`)?parseFloat(localStorage.getItem(`Ingleteado 90°`)) : 0
            
            if (storageIngleteado45) {
            valorFinal += (storageIngleteado45*5)
            } else if (storageIngleteado90){
            valorFinal += (storageIngleteado90*5)
            } else {
                console.log("No se encontró inglete para sumar")
            }
        }

        function sumaRestaHuecos(tipo) {
            console.log(tipo)
            const tipoSpan = document.getElementById(`${tipo.id}Span`);
            const name = tipo.name
            let i = data.huecos.findIndex(elemento => elemento.nombre == name)


            console.log(i)
            const tipoNumeroInput = document.getElementById(`${tipo.id}Numero`);

            if (tipo.checked) {
                tipoSpan.innerHTML = `
                    <br>
                    <label for="${tipo.id}Numero">Cuántos huecos se harán?: </label>
                    <input type="text" id="${tipo.id}Numero">
                `;

                // Actualiza el input después de añadir el HTML
                const nuevoTipoNumeroInput = document.getElementById(`${tipo.id}Numero`);
                nuevoTipoNumeroInput.addEventListener("input", () => {
                    const valorInput = nuevoTipoNumeroInput.value.trim();

                    if (valorInput === "" || valorInput === "0") {
                        if (registroHuecos[tipo.id] !== undefined) {
                            totalHuecos -= registroHuecos[tipo.id];
                            delete registroHuecos[tipo.id];
                            console.log(registroHuecos);
                        }
                    } else {
                        sumarHuecos(valorInput, data.huecos[i].precio, tipo.checked, tipo.id);
                        localStorage.setItem(tipo.name, valorInput)
                        console.log(registroHuecos);
                    }

                    actualizarValorFinal();
                });

            } else {
                if (tipoNumeroInput) {
                    const valorInput = tipoNumeroInput.value.trim();
                    if (valorInput !== "" && valorInput !== "0") {
                        sumarHuecos(valorInput, data.huecos[i].precio, tipo.checked, tipo.id);
                    }
                }
                localStorage.removeItem(tipo.name)
                tipoSpan.innerHTML = `<span></span>`;
            }
        }

        function sumaRestaOtros(tipo) {
            console.log(tipo)
            const tipoSpan = document.getElementById(`${tipo.id}Span`);
            const name = tipo.name
            let i = data.otros.findIndex(elemento => elemento.nombre == name)


            console.log(i)
            const tipoNumeroInput = document.getElementById(`${tipo.id}Numero`);

            if (tipo.checked) {
                tipoSpan.innerHTML = `
                        <br>
                        <label for="${tipo.id}Numero">Cuantas unidades?: </label>
                        <input type="text" id="${tipo.id}Numero">
                    `;

                // Actualiza el input después de añadir el HTML
                const nuevoTipoNumeroInput = document.getElementById(`${tipo.id}Numero`);
                nuevoTipoNumeroInput.addEventListener("input", () => {
                    const valorInput = nuevoTipoNumeroInput.value.trim();

                    if (valorInput === "" || valorInput === "0") {
                        if (registrosOtros[tipo.id] !== undefined) {
                            totalOtros -= registrosOtros[tipo.id];
                            delete registrosOtros[tipo.id];
                            console.log(registrosOtros);
                        }
                    } else {
                        sumarOtros(valorInput, data.otros[i].precio, tipo.checked, tipo.id);
                        localStorage.setItem(tipo.name, valorInput)

                        console.log(registrosOtros);
                    }

                    actualizarValorFinal();
                });

            } else {
                if (tipoNumeroInput) {
                    const valorInput = tipoNumeroInput.value.trim();
                    if (valorInput !== "" && valorInput !== "0") {
                        sumarOtros(valorInput, data.otros[i].precio, tipo.checked, tipo.id);
                    }
                }
                localStorage.removeItem(tipo.name)
                tipoSpan.innerHTML = `<span></span>`;
            }
        }
        function sumarPulidos(metros, precio, isChecked, idCheckbox) {
            let totalidadPulidos = 0
            if (typeof metros === 'string' && metros.includes("+")){
                let values = metros.split("+")
                let result = 0
                for (let value in values){ 
                    result += parseFloat(values[value]) || 0;
                }
            console.log("Totalidad pulidos en suma")
            totalidadPulidos = result * precio; 
            console.log(totalidadPulidos)
            console.log(totalPulidos)
            } else {
             metros = parseFloat(metros) || 0
             console.log("Totalidad pulidos unico")
             totalidadPulidos = metros * precio;
            };
            
            if (isChecked) {
                if (registrosPulidos[idCheckbox] !== undefined) {
                    // Restar el valor anterior si ya está registrado
                    totalPulidos -= registrosPulidos[idCheckbox];
                   
                }
                // Registrar el nuevo valor
                registrosPulidos[idCheckbox] = totalidadPulidos;
                totalPulidos += totalidadPulidos;
                console.log(registrosPulidos)
            } else {
                // Si el checkbox está desmarcado, restar el valor registrado
                if (registrosPulidos[idCheckbox] !== undefined) {
                    totalPulidos -= registrosPulidos[idCheckbox];
                    delete registrosPulidos[idCheckbox];
                    console.log(registrosPulidos)
                }
            }

            actualizarValorFinal();
        }

        function sumarOtros(cantidad, precio, isChecked, idCheckbox) {
            cantidad = parseFloat(cantidad) || 0;
            let totalidadOtros = cantidad * precio;
            if (isChecked) {
                if (registrosOtros[idCheckbox] !== undefined) {
                    // Restar el valor anterior si ya está registrado
                    totalOtros -= registrosOtros[idCheckbox];
                    console.log(registrosOtros)
                }
                // Registrar el nuevo valor
                registrosOtros[idCheckbox] = totalidadOtros;
                totalOtros += totalidadOtros;
            } else {
                if (registrosOtros[idCheckbox] !== undefined) {
                    totalOtros -= registrosOtros[idCheckbox];
                    delete registrosOtros[idCheckbox];
                }
            }

            actualizarValorFinal();
        }

        let final = 0
        function actualizarValorFinal() {
            final = valorFinal + totalHuecos + totalPulidos + totalOtros;
            console.log(final)
        }


        function visualizador_final() {
           
            let i = 0
            view_resultados.innerHTML=""
            for (i; i < localStorage.length; i++) {
                if (localStorage.key(i) == "Área total") {
                 view_resultados.innerHTML += `<li> ${localStorage.key(i)} a trabajar -  ${parseFloat(localStorage.getItem(localStorage.key(i))).toFixed(2)} metros cuadrados </li>`
                }
                else if (localStorage.key(i) == "Precio m2" || localStorage.key(i) == "Precio area") {
                    view_resultados.innerHTML += `<li> ${localStorage.key(i)} - USD ${localStorage.getItem(localStorage.key(i))} </li>`
                } else if (localStorage.key(i) == "Hueco y pegado de pileta" || localStorage.key(i) == "Hueco para anafe" || localStorage.key(i) == "Hueco de grifería" ||
                    localStorage.key(i) == "Hueco para bacha de apoyo" || localStorage.key(i) == "Cajas de Luz") {
                    view_resultados.innerHTML += `<li> Se realizará: ${localStorage.key(i)} -  ${localStorage.getItem(localStorage.key(i))} cantidad  de huecos</li>`
                } else if
                    (localStorage.key(i) == "Borde pulido simple" || localStorage.key(i) == "Borde pulido con bisel" ||
                    localStorage.key(i) == "Medio bastón" || localStorage.key(i) == "Doble bastón" ||
                    localStorage.key(i) == "Medio bastón con tira pegada" ||
                    localStorage.key(i) == "Tira pegada (doble, 4cm)" ||
                    localStorage.key(i) == "Pulido duchero doble" ||
                    localStorage.key(i) == "Pulido duchero simple") {
                    view_resultados.innerHTML += `<li> Se realizará: ${localStorage.key(i)} - con ${sumaMetrosLineales(i)} metros lineales</li>`
                } else if (localStorage.key(i) == "Ingleteado 45°") {
                    view_resultados.innerHTML += `<li> Se realizará: ${localStorage.key(i)} - con ${sumaMetrosLineales(i)} metros lineales</li>
                                        <li> Con un area de la tira de: ${localStorage.getItem("Area de la tira Ingleteado 45°")} metros cuadrados dando un total de 
                                                                        USD ${localStorage.getItem("Precio area Ingleteado 45°")}</li>`
                } else if (localStorage.key(i) == "Ingleteado 90°") {
                    view_resultados.innerHTML += `<li> Se realizará: ${localStorage.key(i)} - con ${sumaMetrosLineales(i)} metros lineales</li>
                                        <li> Con un area de la tira de: ${localStorage.getItem("Area de la tira Ingleteado 90°")} metros cuadrados dando un total de 
                                                                        USD ${localStorage.getItem("Precio area Ingleteado 90°")}</li>`
                } else if (localStorage.key(i) == "Tira antiderrame") {
                    view_resultados.innerHTML += `<li> Se realizará: ${localStorage.key(i)} - con ${sumaMetrosLineales(i)} metros lineales</li>
        <li> Con un area de la tira de: ${parseFloat(localStorage.getItem("Area de la tira Tira antiderrame")).toFixed(2)} metros cuadrados dando un total de 
                                        USD ${localStorage.getItem("Precio area Tira antiderrame")}</li>`
                }
                else if (localStorage.key(i) == "Thiner" ||
                    localStorage.key(i) == "Silicona") {
                    view_resultados.innerHTML += `<li> Se usará: ${localStorage.key(i)} - ${localStorage.getItem(localStorage.key(i))} unidades</li>`
                }
                else if (localStorage.key(i) == "Dekton/Porcelánico") {
                    view_resultados.innerHTML += `<li> Es un trabajo en Dekton o Porcelánico</li>`
                }
            }
            if (final == 0){
                 view_resultados.innerHTML += `<hr><div class="alert alert-primary text-center" role="alert"> Precio Final: USD${valorFinal.toFixed(2)}</div>`
            } else {
                view_resultados.innerHTML += `<div class="alert alert-primary text-center" role="alert"> Precio Final: USD${final.toFixed(2)}</div>`
            }
        
            view_resultados.innerHTML += `
            <div class="text-center">
            <button id="borrar2" class="btn btn-info">Finalizar Tarea</button>
            </div>
            `
            document.getElementById("borrar2").addEventListener("click", borrar)
        }

        function borrar() {
            localStorage.clear()
            localStorage.setItem("token", saveItems.token);
            localStorage.setItem("user", saveItems.user);
            location.reload();
        }
        
        document.getElementById("close").addEventListener("click",()=>{
            localStorage.clear()
            location.reload()
        })

        const sumaMetrosLineales =(i) =>{
            if (localStorage.key(i).length===1){
                return localStorage.getItem(localStorage.key(i))
            } else {
                 let items = localStorage.getItem(localStorage.key(i))
                 let numbers = items.split("+")
                 console.log(numbers)
                 let final=0
                    for (let item in numbers) {
                        final += parseFloat(numbers[item])
                        console.log("Sumando", final)
                    }
                console.log(final.toFixed(2))
                return final.toFixed(2)               
            }
        }

    })
})
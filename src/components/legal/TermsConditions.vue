<script setup>
import BaseModal from '@/components/ui/BaseModal.vue'

const props = defineProps({
  open: { type: Boolean, default: false },
})

const emit = defineEmits(['close'])
</script>

<template>
  <BaseModal
    :open="open"
    title="TÉRMINOS Y CONDICIONES DE USO"
    labelled-by="terms-conditions-title"
    @close="emit('close')"
  >
    <div class="terms-content">
      <p class="terms-last-updated">Última actualización: [FECHA]</p>

      <p>Bienvenido al sitio web oficial de URBANIKAWSAY, en adelante, "URBANIKAWSAY".</p>
      <p>
        El presente documento establece los términos y condiciones aplicables al acceso, navegación y utilización del sitio web de URBANIKAWSAY, así como a los servicios, contenidos, promociones y formularios disponibles a través de este.
      </p>
      <p>
        Al acceder y utilizar este sitio web, el usuario declara haber leído, comprendido y aceptado los presentes Términos y Condiciones. Si no está de acuerdo con alguno de ellos, deberá abstenerse de utilizar el sitio web.
      </p>

      <h3>1. USO DEL SITIO WEB</h3>
      <p>
        El usuario se compromete a utilizar el sitio web de manera lícita, responsable y de conformidad con la legislación peruana vigente.
      </p>
      <ul>
        <li>Utilizar el sitio web con fines ilícitos o fraudulentos.</li>
        <li>Intentar acceder sin autorización a sistemas, servidores o bases de datos relacionados con el sitio.</li>
        <li>Interferir con el funcionamiento normal de la plataforma.</li>
        <li>
          Reproducir, copiar, modificar, distribuir o utilizar contenidos del sitio con fines comerciales sin autorización.
        </li>
        <li>
          Proporcionar información falsa, incompleta o perteneciente a terceros en los formularios de contacto.
        </li>
      </ul>
      <p>
        URBANIKAWSAY podrá restringir o suspender el acceso al sitio web cuando detecte un uso indebido, fraudulento o contrario a estos Términos y Condiciones.
      </p>

      <h3>2. INFORMACIÓN SOBRE LOS PROYECTOS INMOBILIARIOS</h3>
      <p>
        La información publicada en el sitio web tiene carácter informativo y comercial.
      </p>
      <ul>
        <li>
          Las características, dimensiones, precios, cuotas, condiciones de financiamiento, disponibilidad, promociones, imágenes, renders, áreas comunes, fechas, ubicaciones y demás características de los proyectos pueden estar sujetas a modificaciones, actualizaciones o disponibilidad.
        </li>
        <li>
          Las imágenes y representaciones gráficas utilizadas en el sitio, incluyendo renders, ilustraciones, fotografías o imágenes referenciales, pueden tener carácter referencial y no necesariamente representar de manera exacta el resultado final de un proyecto.
        </li>
        <li>
          Los precios, descuentos, promociones y condiciones comerciales estarán sujetos a las condiciones vigentes al momento de realizar la consulta, separación, reserva o contratación correspondiente.
        </li>
        <li>
          La información publicada en el sitio web no sustituye los documentos contractuales, legales o comerciales que correspondan a cada operación inmobiliaria.
        </li>
        <li>
          Para conocer las condiciones específicas de un proyecto, el usuario deberá comunicarse con un asesor autorizado de URBANIKAWSAY.
        </li>
      </ul>

      <h3>3. COTIZACIONES Y SOLICITUDES DE INFORMACIÓN</h3>
      <p>
        Los formularios, botones de contacto y demás canales disponibles en el sitio web permiten al usuario solicitar información sobre proyectos inmobiliarios, promociones, visitas, precios, financiamiento u otros servicios.
      </p>
      <p>
        El envío de un formulario no implica una reserva, separación, compra, adjudicación ni compromiso contractual por parte de URBANIKAWSAY. Cualquier operación inmobiliaria estará sujeta a la evaluación, disponibilidad, condiciones comerciales y documentación correspondiente.
      </p>

      <h3>4. PROMOCIONES, CAMPAÑAS Y BENEFICIOS COMERCIALES</h3>
      <p>
        Las promociones, descuentos, campañas, sorteos, beneficios y actividades comunicadas a través del sitio web estarán sujetas a sus respectivas condiciones, vigencia, requisitos y disponibilidad.
      </p>
      <ul>
        <li>
          URBANIKAWSAY podrá establecer requisitos específicos de participación para cada promoción o campaña.
        </li>
        <li>
          Las condiciones particulares de una promoción prevalecerán sobre la información general publicada en otros canales, cuando corresponda.
        </li>
        <li>
          URBANIKAWSAY podrá modificar, ampliar o dar por concluida una promoción conforme a las condiciones previamente establecidas y a la normativa aplicable.
        </li>
        <li>
          Los beneficios promocionales no podrán interpretarse como permanentes ni aplicarse fuera del periodo de vigencia indicado.
        </li>
      </ul>

      <h3>5. SORTEOS Y EVENTOS</h3>
      <p>
        Cuando URBANIKAWSAY realice sorteos, concursos, eventos o actividades promocionales, estos podrán contar con términos y condiciones específicos.
      </p>
      <ul>
        <li>
          La participación estará sujeta al cumplimiento de los requisitos establecidos para cada actividad.
        </li>
        <li>
          Los premios, fechas, mecánicas, requisitos y condiciones serán comunicados de acuerdo con las características de cada campaña.
        </li>
        <li>
          URBANIKAWSAY se reserva el derecho de verificar el cumplimiento de los requisitos de participación antes de efectuar la entrega de cualquier premio.
        </li>
      </ul>

      <h3>6. FORMULARIOS Y DATOS PROPORCIONADOS POR EL USUARIO</h3>
      <p>
        El usuario que complete un formulario en el sitio web declara que la información proporcionada es verdadera, exacta y actualizada.
      </p>
      <p>
        El usuario será responsable de la información que proporcione a través de los canales digitales de URBANIKAWSAY.
      </p>
      <p>
        Los datos personales proporcionados mediante formularios, canales de contacto u otros medios digitales serán tratados de acuerdo con la Política de Privacidad de URBANIKAWSAY y la legislación peruana aplicable en materia de protección de datos personales.
      </p>
      <p>
        El usuario podrá consultar la Política de Privacidad disponible en este sitio web para conocer cómo se recopilan, utilizan, almacenan y, cuando corresponda, comparten sus datos personales.
      </p>

      <h3>7. PROPIEDAD INTELECTUAL</h3>
      <p>
        Todos los contenidos disponibles en el sitio web, incluyendo, entre otros, textos, fotografías, videos, diseños gráficos, logotipos, nombres comerciales, marcas, ilustraciones, renders, iconos, material audiovisual y elementos visuales, pertenecen a URBANIKAWSAY o son utilizados legítimamente por esta.
      </p>
      <ul>
        <li>Queda prohibida la reproducción, modificación, distribución, publicación, explotación comercial o cualquier otro uso no autorizado de dichos contenidos.</li>
        <li>
          El acceso al sitio web no otorga al usuario ningún derecho de propiedad o licencia sobre los contenidos, marcas o elementos protegidos.
        </li>
      </ul>

      <h3>8. ENLACES A TERCEROS</h3>
      <p>
        El sitio web podrá contener enlaces o accesos a plataformas externas, incluyendo redes sociales, servicios de mensajería, mapas u otros sitios web.
      </p>
      <ul>
        <li>
          Estos enlaces se proporcionan para facilitar la navegación y comunicación con el usuario.
        </li>
        <li>
          URBANIKAWSAY no necesariamente controla ni es responsable del contenido, funcionamiento, políticas de privacidad o términos y condiciones de dichos sitios externos.
        </li>
        <li>
          El uso de plataformas de terceros estará sujeto a las condiciones establecidas por sus respectivos titulares.
        </li>
      </ul>

      <h3>9. DISPONIBILIDAD DEL SITIO WEB</h3>
      <p>
        URBANIKAWSAY realizará esfuerzos razonables para mantener disponible y funcionando correctamente el sitio web. Sin embargo, el sitio podría presentar interrupciones temporales debido a labores de mantenimiento, actualizaciones, fallas técnicas, problemas de conectividad, causas de fuerza mayor u otras circunstancias ajenas al control de URBANIKAWSAY.
      </p>
      <p>
        URBANIKAWSAY no garantiza que el sitio web esté disponible de manera permanente o libre de errores.
      </p>

      <h3>10. MODIFICACIÓN DE LOS CONTENIDOS</h3>
      <p>
        URBANIKAWSAY podrá actualizar, modificar, retirar o incorporar contenidos, proyectos, promociones, información comercial, imágenes o funcionalidades del sitio web en cualquier momento.
      </p>
      <p>
        Las modificaciones podrán realizarse sin necesidad de comunicación individual al usuario, salvo que la legislación aplicable establezca lo contrario.
      </p>

      <h3>11. LIMITACIÓN DE RESPONSABILIDAD</h3>
      <p>
        URBANIKAWSAY procura que la información publicada en el sitio web sea clara y actualizada. Sin embargo, pueden producirse errores involuntarios, omisiones o desactualizaciones.
      </p>
      <p>
        La información disponible en el sitio deberá ser confirmada con un representante autorizado de URBANIKAWSAY antes de tomar decisiones de carácter comercial o contractual.
      </p>
      <p>
        La información publicada en el sitio web no reemplaza los contratos, documentos legales, documentos técnicos ni demás instrumentos que correspondan a cada operación inmobiliaria.
      </p>

      <h3>12. PROTECCIÓN CONTRA USOS FRAUDULENTOS</h3>
      <p>
        URBANIKAWSAY recomienda a los usuarios utilizar únicamente los canales oficiales de comunicación y atención publicados en este sitio web.
      </p>
      <ul>
        <li>
          El usuario deberá verificar que cualquier comunicación, promoción, solicitud de pago o información comercial provenga de canales oficiales de URBANIKAWSAY.
        </li>
        <li>
          URBANIKAWSAY no se responsabiliza por operaciones realizadas con terceros que se hagan pasar por representantes de la empresa cuando dichas operaciones se efectúen fuera de los canales oficiales y sin autorización.
        </li>
        <li>
          Ante cualquier duda sobre una promoción, asesor, cuenta bancaria, pago o proyecto, el usuario deberá comunicarse directamente con los canales oficiales de URBANIKAWSAY antes de realizar cualquier operación.
        </li>
      </ul>

      <h3>13. MODIFICACIÓN DE LOS TÉRMINOS Y CONDICIONES</h3>
      <p>
        URBANIKAWSAY podrá modificar estos Términos y Condiciones cuando resulte necesario para adecuarlos a cambios legales, comerciales, tecnológicos o de funcionamiento del sitio web.
      </p>
      <p>
        La versión vigente será aquella publicada en esta sección, indicando su correspondiente fecha de actualización.
      </p>

      <h3>14. LEGISLACIÓN APLICABLE</h3>
      <p>
        Estos Términos y Condiciones se interpretarán y aplicarán de acuerdo con las leyes vigentes de la República del Perú.
      </p>
      <p>
        Cualquier controversia relacionada con el uso del sitio web será atendida de acuerdo con la legislación peruana y las autoridades competentes, sin perjuicio de los derechos que correspondan a los consumidores conforme a la normativa aplicable.
      </p>

      <h3>15. CONTACTO</h3>
      <p>
        Para consultas relacionadas con estos Términos y Condiciones, los proyectos inmobiliarios, promociones o cualquier información publicada en este sitio web, el usuario podrá comunicarse a través de los canales oficiales disponibles en la página web de URBANIKAWSAY.
      </p>
      <p>© [AÑO] URBANIKAWSAY. Todos los derechos reservados.</p>
    </div>
  </BaseModal>
</template>

<style scoped>
.terms-content {
  padding: 1.5rem;
}

.terms-content h3 {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--color-brand-primary);
}

.terms-content ul {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.terms-content li {
  margin-bottom: 0.5rem;
}

.terms-last-updated {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
  text-align: right;
}
</style>
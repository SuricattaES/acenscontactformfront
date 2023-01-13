<template>
    <div>
        <div class="p-inputgroup">
            <div class="grid w-full grid-nogutter">
                <div class="col-auto pr-2">
                    <Dropdown id="login_phone_prefix" v-model="selectedCountryCode" :options="countryCodes"
                              optionLabel="code" :filter="true" placeholder="Ext."
                              :loading="isLoadingCountryCodes" :showClear="false" 
                              class="w-full loginPhonePrefix" panelClass="loginPhonePrefixPanel"
                              :filterFields='["country", "code"]' @blur="$emit('blur'); emitChanges(); "
                              v-bind:class="$attrs.class">
                        <template #value="slotProps">
                            <div v-if="slotProps.value" class="">
                                <div class="flex">
                                    <div class="flex align-items-center justify-content-center">
                                        <img :src="`/countries/flags/${slotProps.value.country}.svg`"
                                             class="align-content-center phone_country_icon_sel border-round-xs
                                             border-300 border-solid" />
                                    </div>
                                    <div class="flex align-items-center justify-content-center">
                                        <div class="pl-1">{{slotProps.value.code}}</div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template #option="slotProps">
                            <div class="grid p-0 m-0 grid-nogutter">
                                <div class="flex col-fixed align-items-center justify-content-center">
                                    <img :src="`/countries/flags/${slotProps.option.country}.svg`"
                                         class="align-content-center phone_country_icon border-round-xs
                                         border-300 border-solid" />
                                </div>
                                <div class="col-fixed grid-nogutter pl-3">
                                    <div class="flex">
                                        <span class="text-xs">
                                            <i>{{slotProps.option.country}}</i>
                                        </span>
                                    </div>
                                    <div class="flex">
                                        <b>{{slotProps.option.code}}</b>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template #empty>
                            <div class="text-xs line-height-1 pb-2"><b>Ocurrió un error al cargar los países.</b></div>
                            <Button label="Reintentar" icon="pi pi-replay" class="p-button-sm px-2 py-1 p-button-secondary"
                                    @click="loadCountryCodes()" />
                        </template>
                    </Dropdown>
                </div>
                <div class="col">
                    <span class="mb2 mt2 p-float-label">
                        <InputNumber id="login_phone" ref="phoneField" v-model="phoneNumber" 
                                     :useGrouping="false" @blur="$emit('blur'); emitChanges();" 
                                     v-bind:class="$attrs.class" :max="99999999999999" :minFractionDigits="0"
                                     :maxFractionDigits="0" mode="decimal" maxlength="14" 
                                     type="text" class="w-full"/>
                        <label for="login_phone">Número de teléfono</label>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InputNumber  from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import { ref, computed, onMounted, nextTick, watch } from 'vue';

export default {
    components: {
        // PrimeVUE
        InputNumber, Dropdown, Button
    },
    emits: [
        'update:inputcode', 'update:inputnumber', 'update:input', 'update:modelValue', 
        'blur'
    ],
    props: { 
        'modelValue': String, 
    },
    setup(props, context) {
        // Country code
        const countryCodes = ref([]);
        const selectedCountryCode = ref(null);
        const isLoadingCountryCodes = ref(false);

        // Phone number
        const phoneNumber = ref(null);
        const fullNumber = computed(() => {
            let fullNumberComp = '';
            
            if(selectedCountryCode.value != null && selectedCountryCode.value.code != null) {
                fullNumberComp += '+' + selectedCountryCode.value.code.replace(/[^0-9]/g, '');
            }

            if(phoneNumber.value != null) {
                fullNumberComp += phoneNumber.value.toString().replace(/[^0-9]/g, '');
            }

            // Emit context and return
            return fullNumberComp;
        });

        // Emit changes to parent
        const emitChanges = async function() {
            await nextTick();
            context.emit('update:input', fullNumber.value);
            context.emit('update:inputnumber', phoneNumber.value);
            context.emit('update:inputcode', selectedCountryCode.value.code);
            context.emit('update:modelValue', fullNumber.value);
        };

        // Process upcoming numbers from v-model
        watch(() => props.modelValue, async (first) => {
            await adaptModel(first);
        });

        const adaptModel = async function(first) {
            if(first != fullNumber.value) {
                // Populate countrycodes in case there is not data
                if(countryCodes.value.lenght < 1 && !isLoadingCountryCodes.value) {
                    if(countryCodes.value.lenght < 1) {
                        return;
                    }
                }

                if(!first.startsWith('+') || first.length < 4 ) {
                    return;
                }

                let computed = '+' + first.replace(/[^0-9]/g, '');
                // Search in countrycodes what is the corresponding prefix and set it
                if(computed.length > 5) {
                    let sliceNumber = 7;
                    let sliced = '';
                    let selected = [];
                    while(selected.length < 1 && sliceNumber > 1) {
                        if(sliceNumber < computed.length) {
                            sliced = computed.slice(0, sliceNumber);
                            selected = countryCodes.value.filter(val => { return '+' + val.code.replace(/[^0-9]/g, '') == sliced; });
                        }
                        sliceNumber--;
                    }

                    // Set the result and strip the prefix
                    if(selected.length > 0) {
                        selectedCountryCode.value = selected[0];
                        computed = computed.replace(sliced, '');
                    }
                }

                if(computed.length > 0) {
                    phoneNumber.value = Number(computed);
                }
            }
        };

        // Lifecycle
        onMounted(async () => {
            await adaptModel(props.modelValue);
        });

        return { countryCodes, selectedCountryCode, isLoadingCountryCodes, 
                 phoneNumber, fullNumber, emitChanges, adaptModel };
    },
};
</script>

<style scoped>
.phone_country_icon {
    height: 22px;
    width: auto;
}

.phone_country_icon_sel {
    height: 15px;
    width: auto;
}
</style>

<style>
.loginPhonePrefixPanel {
    width: 200px;
}

.loginPhonePrefixPanel li.p-dropdown-item {
    padding-right: 0px !important;
    padding-left: 24px !important;
    padding-top: 6px !important;
    padding-bottom: 6px !important;
}

.loginPhonePrefixPanel ul.p-dropdown-items {
    padding: 0px !important;
}

.loginPhonePrefixPanel div.p-dropdown-header {
    padding: 6px !important;
}

.loginPhonePrefixPanel div.p-dropdown-header input.p-dropdown-filter {
    font-size: 0.8rem;
    padding: .45rem .55rem;
}

.loginPhonePrefix .p-dropdown-trigger {
    font-size: 0.8rem;
    padding: 0px !important;
    width: 1rem;
    padding-right: 12px !important;
}

.loginPhonePrefix .p-dropdown-trigger-icon {
    font-size: 0.7rem;
}
</style>
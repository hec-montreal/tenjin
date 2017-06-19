package ca.hec.tenjin.api.model.template;

import java.util.List;

import lombok.*;

/**
 *
 * @author <a href="mailto:mame-awa.diop@hec.ca">Mame Awa Diop</a>
 * @author <a href="mailto:curtis.van-osch@hec.ca">Curtis van Osch</a>
 * @version $Id: $
 */
@Data
@NoArgsConstructor
public class TemplateStructure {

    private Long id;
    private Boolean mandatory;
    private Boolean displayInMenu;
    private TemplateElement templateElement;
    private ExternalDataProviderDefinition provider;
    private List<TemplateStructure> elements;
    private Long parentId;

    public Boolean hasElements() {
        return elements != null && !elements.isEmpty();
    }
}


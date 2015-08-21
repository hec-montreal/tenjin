/**
 *
 */
package ca.hec.opensyllabus2.api.model.template;

import java.util.Set;

import lombok.*;

/**
 * @author <a href="mailto:mame-awa.diop@hec.ca">Mame Awa Diop</a>
 * @author <a href="mailto:curtis.van-osch@hec.ca">Curtis van Osch</a>
 * @version $Id: $
 */
@Data
@NoArgsConstructor
public class Template {

    @NonNull private Long id;

    @NonNull private String title;

    private String description;

    @NonNull private Boolean active;

    private Set<TemplateElement> elements;

    /*
    private String createdBy;
    private Date createdDate;
    */
}

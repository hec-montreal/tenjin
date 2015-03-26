/**
 *
 */
package ca.hec.opensyllabus2.api.model.template;

import lombok.*;

/**
 */
@Data
public class Template {
    @NonNull private Long template_id;
    @NonNull private String title;
    private String description;
    @NonNull private Boolean active;
    /*
    private String createdBy;
    private Date createdDate;
    */
}
